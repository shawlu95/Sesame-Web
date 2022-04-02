
// 历史开奖总排名记录，所有盲盒，所有用户的排名
const rankInfo = {
  "data": {
    "rank": [
      {
        "player": "0x8fab07df0D43b6752659b06C697C67F2225Fe6bd",
        "win": 5,
        "prize": 420
      },
      {
        "player": "0x456614A49Fd04F7fF86064f79cbb5fb31775a34f",
        "win": 4,
        "prize": 176
      },
      {
        "player": "0x4Cd5675c4f70513e361AA77B70e8089FB5429A0e",
        "win": 2,
        "prize": 88
      }
    ],
    "total": {
      "prize": 684,
      "round": 11,
      "winner": 3
    }
  }
};

// 返回用户购买的所有的票
const ticketInfo = {
  "data": {
    "myTicket": [
      {
        "product": "0x687f58d739A05eb840D4d2bF6E12595e7084cEd6", // 盒子地址
        "player": "0x4Cd5675c4f70513e361AA77B70e8089FB5429A0e",
        "credit": 22, // 花了22美元
        "round": 1, //第一轮买的
        "ticket": 1, // 买了一张
        "block": 18032320
      },
      {
        "product": "0x687f58d739A05eb840D4d2bF6E12595e7084cEd6",
        "player": "0x4Cd5675c4f70513e361AA77B70e8089FB5429A0e",
        "credit": 22,
        "round": 1,
        "ticket": 1,
        "block": 18032498
      },
      {
        "product": "0x687f58d739A05eb840D4d2bF6E12595e7084cEd6",
        "player": "0x4Cd5675c4f70513e361AA77B70e8089FB5429A0e",
        "credit": 22,
        "round": 2,
        "ticket": 1,
        "block": 18032532
      }
    ]
  }
};

const playerProductInfo = {
  "data": {
    "product": {
      "version": "BNB",
      "gameToken": "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
      "feePercent": 5,
      "ticketPrice": "0.05",
      "ticketPerRound": 2,
      "grade": "STEEL"
    },
    "myTicket": [
      {
        "product": "0x569adf72Ad0633FD3EbF1B21b797DE413Ae8bF7F",
        "player": "0x4Cd5675c4f70513e361AA77B70e8089FB5429A0e",
        "credit": 22,
        "round": 1,
        "ticket": 1,
        "block": 18081680,
        "version": "BNB",
        "ticketPrice": "0.05",
        "ticketPerRound": 2,
        "prize": 0.1
      },
      {
        "product": "0x569adf72Ad0633FD3EbF1B21b797DE413Ae8bF7F",
        "player": "0x4Cd5675c4f70513e361AA77B70e8089FB5429A0e",
        "credit": 22,
        "round": 1,
        "ticket": 1,
        "block": 18081682,
        "version": "BNB",
        "ticketPrice": "0.05",
        "ticketPerRound": 2,
        "prize": 0.1
      },
      {
        "product": "0x569adf72Ad0633FD3EbF1B21b797DE413Ae8bF7F",
        "player": "0x4Cd5675c4f70513e361AA77B70e8089FB5429A0e",
        "credit": 44,
        "round": 2,
        "ticket": 2,
        "block": 18081685,
        "version": "BNB",
        "ticketPrice": "0.05",
        "ticketPerRound": 2,
        "prize": 0.1
      }
    ],
    "myWin": [
      {
        "win": 2,
        "prize": 88
      }
    ],
    "history": [
      {
        "round": 6,
        "myTicket": 0,
        "player": "0x456614A49Fd04F7fF86064f79cbb5fb31775a34f",
        "prize": 44
      },
      {
        "round": 5,
        "myTicket": 0,
        "player": "0x456614A49Fd04F7fF86064f79cbb5fb31775a34f",
        "prize": 44
      },
      {
        "round": 4,
        "myTicket": 0,
        "player": "0x456614A49Fd04F7fF86064f79cbb5fb31775a34f",
        "prize": 44
      },
      {
        "round": 3,
        "myTicket": 0,
        "player": "0x456614A49Fd04F7fF86064f79cbb5fb31775a34f",
        "prize": 44
      },
      {
        "round": 2,
        "myTicket": 2,
        "player": "0x4Cd5675c4f70513e361AA77B70e8089FB5429A0e",
        "prize": 44
      },
      {
        "round": 1,
        "myTicket": 2,
        "player": "0x4Cd5675c4f70513e361AA77B70e8089FB5429A0e",
        "prize": 44
      }
    ],
    "ranking": [
      {
        "player": "0x456614A49Fd04F7fF86064f79cbb5fb31775a34f",
        "myTicket": 0,
        "win": 4,
        "prize": 176
      },
      {
        "player": "0x4Cd5675c4f70513e361AA77B70e8089FB5429A0e",
        "myTicket": 4,
        "win": 2,
        "prize": 88
      }
    ]
  }
};

const token = {
  "data": {
    "stat": [
      {
        "token": "BNB",
        "prize_token": 0,
        "prize_usd": 652,
        "player": 3,
        "round": 11
      }
    ],
    "map": {
      "BNB": "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
      "BUSD": "0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7",
      "SESA": "0x9c924A81572656b8a0e75b41C56D6fcc94826849",
      "ETH": "0x8BaBbB98678facC7342735486C851ABD7A0d17Ca",
      "BTC": "0x6ce8dA28E2f864420840cF74474eFf5fD80E65B8"
    },
    "reverseMap": {
      "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd": "BNB",
      "0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7": "BUSD",
      "0x9c924A81572656b8a0e75b41C56D6fcc94826849": "SESA",
      "0x8BaBbB98678facC7342735486C851ABD7A0d17Ca": "ETH",
      "0x6ce8dA28E2f864420840cF74474eFf5fD80E65B8": "BTC"
    }
  }
}

module.exports = { playerProductInfo, ticketInfo, rankInfo, token };