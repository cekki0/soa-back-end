import { User } from "../model/user.model";
import driver from "../utils/db-connection";
import logger from "../utils/logger";

export default class FollowService {
  async createUser(user: User): Promise<void> {
    const session = driver.session();

    try {
      const result = await session.run(
        `
          CREATE (u:User {id: $id, username: $name})
        `,
        { id: user.id, name: user.username }
      );
    } catch (error) {
      logger.error("Error creating user:", error);
      throw error;
    } finally {
      await session.close();
    }
  }

  async followUser(userId: number, followUserId: number): Promise<void> {
    const session = driver.session();
    try {
      await session.run(
        `
          MATCH (u:User {id: $userId}), (fu:User {id: $followUserId})
          MERGE (u)-[:FOLLOWS]->(fu)
        `,
        { userId, followUserId }
      );
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
          username: follower.properties.username,
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
          username: followingUser.properties.username,
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
}
