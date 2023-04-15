// DBConnection.js

class DBConnection {
	static mysql = require('mysql');
	static connection;

	static async makeConnection() {

		this.connection = await this.mysql.createConnection({
			debug: true,
			host: "localhost",
			user: "cpsc471",
			password: "password",
			database: "auctionhouse"
		});

		this.connection.connect(function (err) {
			if (err) {
				console.log(`Connection failed: ${err}`)
			}
			console.log("connected");
		})
	}

	static closeConnection() {
		if (!this.connection) {
			return;
		}
		this.connection.end();
	}

	static async makeQuery(query) {
		if (this.connection === undefined) {
			await this.makeConnection();
		}

		return new Promise((resolve, reject) => {
			console.log(`Running query: ${query}`);
			this.connection.query(query, function (err, results, fields) {
				if (err) {
					return reject(err) // rejections are for query errors, network and other failures
				} else {
					return resolve(results, fields); // resolve with query results
				}

			})
		})
	}

	// add user to database with their: firstname, lastname, address, card number, username, password
	static async addUser({fName, lName, address, cardNumber, username, password}) {
		await this.makeQuery(`INSERT INTO user (fName, lName, address, cardNumber, username, password) 
			VALUES ('${fName}', '${lName}', '${address}', '${cardNumber}', '${username}', '${password}');`);
	}

	static async addAdmin({userID}) {

		if (!await DBConnection.verifyUser({userID: userID})) {
			console.log("userID Not Found");
			return;
		}

		await this.makeQuery(`INSERT INTO admin (userID) VALUES ('${userID}');`);
	}

	static async addAuction({startDate, endDate, minBid, buyOut, currentBid, adminID, vin}) {

		if (!await DBConnection.verifyAdmin({adminID: adminID})) {
			console.log("admin not found");
			return;
		}
		if (!await DBConnection.verifyVehicle({vin: vin})) {
			console.log("vehicle not found");
			return;
		}

		await this.makeQuery(`INSERT INTO auction (startDate, endDate, minBid, buyOut, currentBid, winnerUserID, adminID, vin) 
			VALUES (
				'${startDate}',
				'${endDate}', 
				'${minBid}', 
				'${buyOut}', 
				'${currentBid}', 
				${null}, 
				'${adminID}', 
				'${vin}'
			);`);

	}

	// // // // // INSERT TO DATABASE FUNCTIONS // // // // // 

	// insert new bid using auctionID, userID, amount
	static async addBid({auctionID, userID, amount}) {

		if (!await DBConnection.verifyAuction({auctionID: auctionID})) {
			console.log("auction not found");
			return;
		}
		if (!await DBConnection.verifyUser({userID: userID})) {
			console.log("user Not found");
			return;
		}

		await this.makeQuery(`INSERT INTO bids (auctionID, userID, amount) 
			VALUES (
				'${auctionID}',
				'${userID}',
				'${amount}'
			)`);
	}

	static async addVehicle({year, make, model, color, ownerID}) {
		if (!await DBConnection.verifyUser({userID: ownerID})) {
			console.log("no owner found");
			return;
		}

		await this.makeQuery(`INSERT INTO vehicle (year, make, model, color, ownerID) 
			VALUES (
				'${year}',
				'${make}',
				'${model}',
				'${color}',
				'${ownerID}'
			)`);
	}

	static async addVehicleWithVIN({vin, year, make, model, color, ownerID}) {
		if (!await DBConnection.verifyUser({userID: ownerID})) {
			console.log("no owner found");
			return;
		}

		await this.makeQuery(`INSERT INTO vehicle (vin, year, make, model, color, ownerID) 
			VALUES (
				'${vin}',
				'${year}',
				'${make}',
				'${model}',
				'${color}',
				'${ownerID}'
			)`);
	}

	static async addTruck({vin, bedLength}) {
		if (!await DBConnection.verifyVehicle({vin: vin})) {
			console.log("vehicle not found");
			return;
		}

		await this.makeQuery(`INSERT INTO truck (vin, bedLength) 
			VALUES (
				'${vin}',
				'${bedLength}'
			)`);
	}

	static async addSUV({vin, seats}) {
		if (!await DBConnection.verifyVehicle({vin: vin})) {
			console.log("vehicle not found");
			return;
		}

		await this.makeQuery(`INSERT INTO suv (vin, seats) 
			VALUES (
				'${vin}',
				'${seats}'
			)`);
	}

	static async addCar({vin, doors}) {
		if (!await DBConnection.verifyVehicle({vin: vin})) {
			console.log("vehicle not found");
			return;
		}

		await this.makeQuery(`INSERT INTO car (vin, doors) 
			VALUES (
				'${vin}',
				'${doors}'
			)`);
	}

	// // // // // END INSERT TO DATABASE FUNCTIONS END // // // // // 

	// // // // // VERIFIERS // // // // //

	// verify user exists based on userID
	static async verifyUser({userID}) {
		let res = await this.makeQuery(`SELECT userID FROM user WHERE userID = '${userID}';`);
		return res.length !== 0;
	}

	// verify User is Admin using userID
	static async verifyAdmin({adminID}) {
		let res = await this.makeQuery(`SELECT adminID FROM admin WHERE adminID = '${adminID}';`);
		return res.length !== 0;
	}

	static async verifyAuction({auctionID}) {
		let res = await this.makeQuery(`SELECT auctionID FROM auction WHERE auctionID = '${auctionID}';`);
		return res.length !== 0;
	}

	static async verifyVehicle({vin}) {
		let res = await this.makeQuery(`SELECT vin FROM vehicle WHERE vin = '${vin}';`);
		return res.length !== 0;
	}

	static async verifyUserIsAdmin({userID}) {
		let res = await this.makeQuery(`SELECT adminID FROM admin WHERE userID = '${userID}';`);
		return res.length !== 0;
	}

	static async verifyAuctionIsOpen(auctionObject) {
		let startDate = new Date(auctionObject.startDate).getTime();
		let endDate = new Date(auctionObject.endDate).getTime();

		let today = new Date().getTime();

		if (startDate <= today && endDate >= today) {
			return true;
		}
		return false;
	}

	// return 0 if no user
	// 	      1 if user
	//		 -1 if admin
	static async verifyUserPassword({username, password}) {
		console.log('verifying password');

		let res = await this.makeQuery(`SELECT username, password, userID FROM USER WHERE username = '${username}';`);

		console.log('Past query')
		if (res.length === 0) { // if no usernames found
			return 0;
		}

		let validPass = false;
		let isAdmin = false;

		for (let row = 0; row < res.length; row++) {
			console.log("CHECKING IF PASSWORD IS VALID!!! " + res[row].password + " =? " + password)

			if (res[row].password === password) {
				validPass = true;
				console.log("PASSWORD VALID!!! " + res[row].password)
			}
			if (await this.verifyUserIsAdmin({userID: res[row].userID})) {
				isAdmin = true;
			}
		}

		if (!validPass) { // if no passwords match
			console.log("password Invalid")
			return 0;
		}

		if (isAdmin) {
			console.log("isAdmin")
			return -1;
		}

		console.log("isUser")
		return 1; // is user not admin

	}

	// // // // // END VERIFIERS // // // // //

	// // // // // GETTERS // // // // //

	static async getUserIDFromUsername({username}) {
		let q = `SELECT userID FROM user WHERE username = '${username}';`;
		return (await DBConnection.makeQuery(q))[0].userID;
	}

	static async getBidsFromUsername({username}) {
		let query = `SELECT auctionID, amount FROM bids NATURAL JOIN user WHERE username = '${username}';`;
		return await this.makeQuery(query);
	}

	static async getAuctionFromID({auctionID}) {
		let query = `SELECT * FROM auction WHERE auctionID = '${auctionID}';`;
		return await this.makeQuery(query);
	}

	static async getVehicleFromID({vin}) {
		let query = `SELECT * FROM vehicle WHERE vin = '${vin}';`;
		return (await this.makeQuery(query))[0];
	}

	static async getCurrentAuctionBid({auctionID}) {
		return (await DBConnection.getAuctionFromID({auctionID: auctionID}))[0].currentBid;
	}

	static async getAllAuctions() {
		let query = `SELECT * FROM auction;`;
		return await this.makeQuery(query);
	}

	// return all open auction in list
	static async getCurrentAuctions() {
		let allAuctions = await DBConnection.getAllAuctions();
		let currentAuctions = [];
		for (let i = 0; i < allAuctions.length; i++) {
			if (await DBConnection.verifyAuctionIsOpen(allAuctions[i])) {
				currentAuctions.push(allAuctions[i]);
			}
		}
		return currentAuctions;
	}

	// type either: truck/suv/car (tolower)
	static async getAuctionByVehicleType({type}) {
		if (!type in ["truck", "suv", "car"]) {

		}
	}

	// // // // // END GETTERS // // // // //

	// // // // // SETTERS // // // // //

	static async setAuctionBid({auctionID, amount}) {
		let query = `UPDATE auction SET currentBid = '${amount}' WHERE auctionID = '${auctionID}';`;
		await this.makeQuery(query);
	}

	// // // // // END SETTERS // // // // //

	static async placeBid({auctionID, userID, amount}) {
		let auction = await DBConnection.getAuctionFromID({auctionID: auctionID});

		if (!await DBConnection.verifyAuctionIsOpen(auction)) {
			console.log("this action is closed");
			return;
		}

		let currentBid = await DBConnection.getCurrentAuctionBid({auctionID: auctionID});

		if (currentBid < amount) {
			console.log("this bid is too low");
			return;
		}

		// add bid to database
		await DBConnection.addBid({auctionID: auctionID, userID: userID, amount: amount});

		// update current auction to have the highest bid
		await DBConnection.setAuctionBid({auctionID: auctionID, amount: amount});

	}

	// type either truck, suv, car
	// quality is either bedLength, seats, doors
	static async specifyVehicle({vin, type, quality}) {
		if (!await DBConnection.verifyVehicle({vin: vin})) {
			console.log("vehicle not found");
			return;
		}

		if(type === "truck") {
			await DBConnection.addTruck({vin: vin, bedLength: quality});
		} else if(type === "suv") {
			await DBConnection.addSUV({vin: vin, seats: quality});
		} else if(type === "car") {
			await DBConnection.addCar({vin: vin, doors: quality});
		}

	}
}

module.exports = DBConnection;

async function test() {
 	let temp = await DBConnection.specifyVehicle({vin: 1, type: "car", quality: 4});
 	console.log("the answer:", temp);

	//console.log(await DBConnection.verifyAuctionIsOpen(temp[0]));
}

//test();

/*DBConnection.addUser({
		fName: "john",
		lName: "smith",
		address: "1 1 1 street",
		cardNumber: "1234",
		username: "jSmith",
		password: "pass"
	})

	DBConnection.addUser({
		fName: "john",
		lName: "smith",
		address: "222 street",
		cardNumber: "1234",
		username: "jSmith",
		password: "pass"
	})

	DBConnection.addUser({
		fName: "john",
		lName: "smith",
		address: "333 street",
		cardNumber: "1234",
		username: "jSmith",
		password: "pass"
	})

	DBConnection.addAdmin({userID: 3});
	DBConnection.addVehicle({
		year: "2020", 
		make: "honda", 
		model: "civic", 
		color: "blue", 
		ownerID: "1"
	});


	DBConnection.addAuction({
		startDate: "2023-04-12", 
		endDate: "2023-05-12", 
		minBid: "100", 
		buyOut: "1000", 
		currentBid: '0', 
		winnerUserID: null, 
		adminID: "1", 
		vin: "1"
	});


	DBConnection.addBid({
		auctionID: "1", 
		userID: "2", 
		amount: "100"
	});
*/	
//DBConnection.makeQuery(`SELECT * FROM user;`);
/*
let t = DBConnection.verifyUserPassword({
	username: "jsmith",
	pass: "pass"
})


if(t === 1) {
	console.log("1");
} else if(t === 0) {
	console.log("0");
}


DBConnection.addUser({
	fName: "john",
	lName: "smith",
	address: "1 1 1 street",
	cardNumber: "1234",
	username: "jSmith",
	password: "pass"
	
});
*/