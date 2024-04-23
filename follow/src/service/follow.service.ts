import { User } from "../model/user.model";
import driver from "../utils/db-connection";
import logger from "../utils/logger";

export default class FollowService {
    async createUser(user: User): Promise<void> {
        const session = driver.session();

        try {
            const result = await session.run(
                `
          CREATE (u:User {id: $id})
        `,
                { id: user.id }
            );
        } catch (error) {
            logger.error("Error creating user:", error);
            throw error;
        } finally {
            await session.close();
        }
    }

    async followUser(
        userId: number,
        followUserId: number
    ): Promise<{ followUserId: number; userId: number }> {
        const session = driver.session();
        try {
            const result = await session.run(
                `
          MATCH (u:User {id: $userId}), (fu:User {id: $followUserId})
          MERGE (u)-[:FOLLOWS]->(fu)
        `,
                { userId, followUserId }
            );
            return { userId, followUserId };
        } catch (error) {
            logger.error("Error following user:", error);
            throw error;
        } finally {
            await session.close();
        }
    }

    async unfollowUser(userId: number, followUserId: number): Promise<void> {
        const session = driver.session();
        try {
            await session.run(
                `
          MATCH (u:User {id: $userId})-[r:FOLLOWS]->(fu:User {id: $followUserId})
          DELETE r
        `,
                { userId, followUserId }
            );
        } catch (error) {
            logger.error("Error unfollowing user:", error);
            throw error;
        } finally {
            await session.close();
        }
    }

    async getUserFollowers(userId: number): Promise<User[]> {
        const session = driver.session();
        let followers: User[] = [];
        try {
            const result = await session.run(
                `
          MATCH (follower:User)-[:FOLLOWS]->(u:User)
          WHERE u.id = $userId
          RETURN follower
        `,
                { userId }
            );

            followers = result.records.map((record) => {
                const follower = record.get("follower");
                return {
                    id: follower.properties.id,
                };
            });
        } catch (error) {
            logger.error("Error getting user followers:", error);
            throw error;
        } finally {
            await session.close();
        }

        return followers;
    }

    async getUsersFollowedByUser(userId: number): Promise<User[]> {
        const session = driver.session();
        let following: User[] = [];
        try {
            const result = await session.run(
                `
          MATCH (u:User)-[:FOLLOWS]->(following:User)
          WHERE u.id = $userId
          RETURN following
        `,
                { userId }
            );

            following = result.records.map((record) => {
                const followingUser = record.get("following");
                return {
                    id: followingUser.properties.id,
                };
            });
        } catch (error) {
            logger.error("Error getting users followed by user:", error);
            throw error;
        } finally {
            await session.close();
        }

        return following;
    }

    async getFollowingRecommendations(userId: number): Promise<User[]> {
        const session = driver.session();
        let recommendations: User[] = [];
        try {
            const result = await session.run(
                `
                MATCH (u:User {id: $userId})-[:FOLLOWS]->(:User)-[:FOLLOWS]->(recommended:User)
                WHERE NOT (u)-[:FOLLOWS]->(recommended) AND u <> recommended
                RETURN recommended
                `,
                { userId }
            );

            recommendations = result.records.map((record) => {
                const recommendedUser = record.get("recommended");
                return {
                    id: recommendedUser.properties.id,
                    // Add other properties of the user if needed
                };
            });
        } catch (error) {
            // Handle error
            console.error("Error getting following recommendations:", error);
            throw error;
        } finally {
            await session.close();
        }

        return recommendations;
    }
}
