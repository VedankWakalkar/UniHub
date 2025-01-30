from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "postgresql+asyncpg://user:password@localhost:5432/database_name"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"asyncio": True})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
