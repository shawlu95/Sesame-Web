
// 历史开奖总排名记录，所有盲盒，所有用户的排名
const rankInfo = {
  "data": {
    "rank": [
      {
        "player": "0x8fab07df0D43b6752659b06C697C67F2225Fe6bd",
        "wins": 2, // 赢了2轮
        "prize": 884 // 总奖金884美元
      },
      {
        "player": "0x456614A49Fd04F7fF86064f79cbb5fb31775a34f",
        "wins": 3,
        "prize": 618
      },
      {
        "player": "0x4Cd5675c4f70513e361AA77B70e8089FB5429A0e",
        "wins": 1,
        "prize": 44
      }
    ]
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
      "version": "BNB", // 盒子币种，"BNB"
      "gameToken": "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd", // 盒子币种的地址
      "feePercent": 5,
      "ticketPrice": "0.5", // 
      "ticketPerRound": 2, // 开奖条件：满10人后开盲盒
      "grade": "SILVER" // 盒子外观, "银盒子"
    },
    "myTicket": [ // 用户在当前盒子下所有的历史购买记录
      {
        "product": "0x875dD95cbbb87f51eE2670CACb3eC6ca9D790caD", // 该盒子的地址
        "player": "0x8fab07df0D43b6752659b06C697C67F2225Fe6bd", // 用户地址
        "credit": 221, // 花了221 美元
        "round": 1, // 第一轮奖池
        "ticket": 1, // 买了一张票
        "block": 18032993
      },
      {
        "product": "0x875dD95cbbb87f51eE2670CACb3eC6ca9D790caD",
        "player": "0x8fab07df0D43b6752659b06C697C67F2225Fe6bd",
        "credit": 221,
        "round": 2, // 第二轮奖池
        "ticket": 1, // 买了一张票
        "block": 18033010
      },
      {
        "product": "0x875dD95cbbb87f51eE2670CACb3eC6ca9D790caD",
        "player": "0x8fab07df0D43b6752659b06C697C67F2225Fe6bd",
        "credit": 221,
        "round": 2, // 第二轮奖池
        "ticket": 1, // 又买了一张票，分两单买的
        "block": 18033013
      },
      {
        "product": "0x875dD95cbbb87f51eE2670CACb3eC6ca9D790caD",
        "player": "0x8fab07df0D43b6752659b06C697C67F2225Fe6bd",
        "credit": 221,
        "round": 3,
        "ticket": 1,
        "block": 18033018
      },
      {
        "product": "0x875dD95cbbb87f51eE2670CACb3eC6ca9D790caD",
        "player": "0x8fab07df0D43b6752659b06C697C67F2225Fe6bd",
        "credit": 221,
        "round": 3,
        "ticket": 1,
        "block": 18033034
      }
    ],
    "myWin": {
      "round": 2, // 用户赢了2轮
      "prize": 884 //总奖金值884美元
    },
    "history": [ // 盲盒的开奖记录
      {
        "round": 3,
        "myTicket": 2,// 第三轮我买了2张票，赢家是我自己
        "player": "0x8fab07df0D43b6752659b06C697C67F2225Fe6bd",
        "prize": 442 // 奖金价值442美元
      },
      {
        "round": 2,
        "myTicket": 2, // 第二轮我买了2张票，赢家是我自己
        "player": "0x8fab07df0D43b6752659b06C697C67F2225Fe6bd",
        "prize": 442 // 奖金价值442美元
      },
      {
        "round": 1,
        "myTicket": 1, // 第一轮我买了1张票，赢家是别人
        "player": "0x456614A49Fd04F7fF86064f79cbb5fb31775a34f",
        "prize": 442 // 奖金价值442美元
      }
    ],
    "ranking": [ // 该盲盒的排行榜
      {
        // 我赢得最多，买了四张票，赢了两轮，总价值884美元
        "player": "0x8fab07df0D43b6752659b06C697C67F2225Fe6bd",
        "myTicket": 4, // 买了四张票
        "wins": 2, // 中了两轮奖
        "prize": 884 // 总价值884美元
      },
      {
        // 第二名买了一张票，赢了一轮
        "player": "0x456614A49Fd04F7fF86064f79cbb5fb31775a34f",
        "myTicket": 1, // 买了一张票
        "wins": 1, // 中了一轮奖
        "prize": 442 // 总价值442 美元
      }
    ]
  }
};

module.exports = { playerProductInfo, ticketInfo, rankInfo };