DROP DATABASE guardPi;
CREATE DATABASE guardPi;

DROP TABLE IF EXISTS systemEvents;
DROP TABLE IF EXISTS userAccounts;

CREATE TABLE userAccounts (
    id VARCHAR(255) NOT NULL UNIQUE,
    username CHAR(50) NOT NULL,
    userPass VARCHAR(255) NOT NULL,
    userToken VARCHAR(255) NOT NULL,
    PRIMARY KEY (userToken)
);

CREATE TABLE systemEvents(
    id SERIAL PRIMARY KEY,
    eventTime TIMESTAMPTZ DEFAULT NOW(),
    deviceName VARCHAR(50) NOT NULL,
    deviceType VARCHAR(50) NOT NULL,
    deviceMac VARCHAR(50) NOT NULL,
    eventMessage VARCHAR(255) NOT NULL
);

INSERT INTO userAccounts (id, username, userPass, userToken) VALUES ('ee83d499-f19f-4101-9b55-b50d0311b768', 'guardPi_user', '$2b$10$OhrmA9r0N62rH4J5.KAj5OBfw2xLoiTBiPCfLsULj.UjvxovuMRUO', '7689e12f-6498-4b63-804f-94cd463d0d4f');

-- omit creating a user if user account below has already been created
CREATE USER guardPi_user WITH PASSWORD 'XeqLLSLkl3IcgsYp';

GRANT SELECT, UPDATE, INSERT, UPDATE ON useraccounts TO guardPi_user;
GRANT SELECT, UPDATE, INSERT, UPDATE ON systemevents TO guardPi_user;
GRANT USAGE, SELECT ON SEQUENCE systemevents_id_seq TO guardPi_user;