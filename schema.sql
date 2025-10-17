CREATE TABLE IF NOT EXISTS User (
  id          varchar(191) NOT NULL PRIMARY KEY,
  email       varchar(191) NOT NULL UNIQUE,
  displayName varchar(191) NOT NULL,
  createdAt   datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updatedAt   datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS Testimony (
  id         varchar(191) NOT NULL PRIMARY KEY,
  slug       varchar(191) NOT NULL UNIQUE,
  title      varchar(191) NOT NULL,
  lead       varchar(191) NULL,
  body       longtext NOT NULL,
  tags       json NOT NULL,
  status     enum('DRAFT','PUBLISHED','UNDER_REVIEW','HELD','REMOVED') NOT NULL DEFAULT 'PUBLISHED',
  authorId   varchar(191) NOT NULL,
  createdAt  datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updatedAt  datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  CONSTRAINT fk_testimony_author FOREIGN KEY (authorId) REFERENCES User(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_testimony_createdAt ON Testimony (createdAt);
