export class AuctionModel {
    constructor(auctionID, startDate, endDate, minBid, buyOut, currentBid, winnerUserID, adminID, vin) {
        this.auctionID = auctionID
        this.startDate = startDate
        this.endDate= endDate
        this.minBid = minBid
        this.buyOut = buyOut
        this.currentBid = currentBid
        this.winnerUserID = winnerUserID
        this.adminID = adminID
        this.vin = vin
    }
}