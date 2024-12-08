const {
  getCurrentHighestBid,
  updateHighestBid,
  saveBid,
} = require("./auctionService");

async function placeBid(auctionId, userId, bidAmount) {
  const currentHighestBid = await getCurrentHighestBid(auctionId);
  const id = parseInt(auctionId);
  console.log("current hightest bid: " + currentHighestBid);
  if (bidAmount <= currentHighestBid) {
    return {
      success: false,
      message: "Bid is lower than the current highest bid.",
    };
  }
  userId = 1;
  await updateHighestBid(id, bidAmount);
  await saveBid(id, userId, bidAmount);

  return { success: true, message: "Bid placed successfully." };
}

module.exports = {
  placeBid,
};
