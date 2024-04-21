import "dotenv/config";
import neo4j from "neo4j-driver";

const driver = neo4j.driver(
  process.env.NEO4J_DATABASE_URL || "bolt://localhost:7687",
  neo4j.auth.basic(
    process.env.NEO4J_DATABASE_USERNAME || "neo4j",
    process.env.NEO4J_DATABASE_PASSWORD || "12345678"
  )
);

export default driver;
