CREATE TABLE IF NOT EXISTS Comment (
  id           varchar(191) PRIMARY KEY,
  testimony_id varchar(191) NOT NULL,
  author_id    varchar(191) NOT NULL,
  body         text NOT NULL,
  status       enum('published','held','removed') NOT NULL DEFAULT 'held',
  createdAt    datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updatedAt    datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  INDEX (testimony_id),
  CONSTRAINT fk_comment_post FOREIGN KEY (testimony_id) REFERENCES Testimony(id),
  CONSTRAINT fk_comment_user FOREIGN KEY (author_id) REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS Flag (
  id           varchar(191) PRIMARY KEY,
  target_type  enum('post','comment') NOT NULL,
  target_id    varchar(191) NOT NULL,
  reason       enum('disrespect','hate','spam','off-topic','other') NOT NULL,
  reporter_id  varchar(191) NOT NULL,
  weight       decimal(4,2) NOT NULL DEFAULT 1.0,
  createdAt    datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  INDEX (target_type, target_id)
);

CREATE TABLE IF NOT EXISTS Reaction (
  id           varchar(191) PRIMARY KEY,
  testimony_id varchar(191) NOT NULL,
  user_id      varchar(191) NOT NULL,
  type         enum('amen','felt_this','beautiful') NOT NULL,
  createdAt    datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  UNIQUE KEY unique_reaction (testimony_id, user_id, type),
  CONSTRAINT fk_reaction_post FOREIGN KEY (testimony_id) REFERENCES Testimony(id)
);

CREATE TABLE IF NOT EXISTS Consent (
  id              varchar(191) PRIMARY KEY,
  user_id         varchar(191) NOT NULL,
  policy_version  varchar(32) NOT NULL,
  license_choice  enum('CC_BY_NC_SA') NOT NULL DEFAULT 'CC_BY_NC_SA',
  timestamp       datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  CONSTRAINT fk_consent_user FOREIGN KEY (user_id) REFERENCES User(id)
);
