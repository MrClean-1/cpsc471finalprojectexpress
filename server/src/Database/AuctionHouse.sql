# Auction house database

DROP DATABASE IF EXISTS AUCTIONHOUSE;
CREATE DATABASE AUCTIONHOUSE;
USE AUCTIONHOUSE;

DROP TABLE IF EXISTS USER;
CREATE TABLE USER (
	userID 		int NOT NULL AUTO_INCREMENT,
	fName		varchar(100),
	lName		varchar(100),
	address		varchar(100),
	cardNumber	int,
	userName	varchar(100),
	password	varchar(100),

	PRIMARY KEY (userID)
);

DROP TABLE IF EXISTS ADMIN;
CREATE TABLE ADMIN (
	adminID		int NOT NULL AUTO_INCREMENT,
	userID 		int NOT NULL,

	PRIMARY KEY (adminID),
	FOREIGN KEY (userID) REFERENCES USER (userID)
);

DROP TABLE IF EXISTS VEHICLE;
CREATE TABLE VEHICLE (
	vin			int NOT NULL AUTO_INCREMENT,
	year		int,
	make		varchar(100),
	model		varchar(100),
	color		varchar(100),
	ownerID		int NOT NULL,

	PRIMARY KEY (vin),
	FOREIGN KEY (ownerID) REFERENCES USER (userID)
);

DROP TABLE IF EXISTS TRUCK;
CREATE TABLE TRUCK (
	vin 		int NOT NULL,
	bedLength	int,

	PRIMARY KEY (vin),
	FOREIGN KEY (vin) REFERENCES VEHICLE (vin)
);

DROP TABLE IF EXISTS SUV;
CREATE TABLE SUV (
	vin 	int NOT NULL,
	seats	int,

	PRIMARY KEY (vin),
	FOREIGN KEY (vin) REFERENCES VEHICLE (vin)
);

DROP TABLE IF EXISTS CAR;
CREATE TABLE CAR (
	vin 	int NOT NULL,
	doors	int,

	PRIMARY KEY (vin),
	FOREIGN KEY (vin) REFERENCES VEHICLE (vin)
);

DROP TABLE IF EXISTS AUCTION;
CREATE TABLE AUCTION (
	auctionID		int NOT NULL AUTO_INCREMENT,
	startDate		DATE,
	endDate			DATE,
	minBid			int,
	buyOut			int,
	currentBid		int,
	winnerUserID	int,
	adminID			int NOT NULL,
	vin				int NOT NULL,

	PRIMARY KEY (auctionID),
	FOREIGN KEY (winnerUserID) REFERENCES USER (userID),
	FOREIGN KEY  (adminID) REFERENCES ADMIN (adminID),
	FOREIGN KEY (vin) REFERENCES VEHICLE (vin)
);

DROP TABLE IF EXISTS BIDS;
CREATE TABLE BIDS (
	auctionID	int NOT NULL,
	userID 		int NOT NULL,
	amount		int,

	PRIMARY KEY (auctionID, userID),
	FOREIGN KEY (auctionID) REFERENCES AUCTION (auctionID),
	FOREIGN KEY (userID) REFERENCES USER (userID)
);
