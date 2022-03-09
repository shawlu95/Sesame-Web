import './App.css';
import React, { useEffect, useState } from 'react'
import { useEthers } from "@usedapp/core";
import { Grid, TextField, Button, FormLabel, InputLabel, FormControl } from '@mui/material';
import config from './config.json';
import {
  usePlayerCount,
  useEnter,
  useTotalFundEmitted,
  useRound,
  useRecentWinner
} from './hooks';

const version = 'SesameBnb';
const {
  name, pricePerTicket, token, prize, ticketPerRound
} = config[version];

function App() {
  const { account, activateBrowserWallet } = useEthers();
  const [ticket, setTicket] = useState(1);
  const count = usePlayerCount();
  const recentWinner = useRecentWinner();
  const totalFundEmitted = useTotalFundEmitted();
  const round = useRound();
  const { enter } = useEnter(pricePerTicket);

  const selectTikcet = (event) => {
    let text = event.target.value;
    setTicket(parseInt(text));
  };
  const buyTicket = (event) => {
    const payable = ticket * pricePerTicket;
    enter(ticket);
  };

  const currentRoundText = `第${round}轮`;
  const currentPlayerText = `参与玩家: ${count} / ${ticketPerRound}`;
  const currentRoundPrizeText = `本轮奖金：${prize} ${token}`;
  const totalFundEmittedText = `历史奖金：${totalFundEmitted} ${token}`;
  const previousWinnerText = `上轮赢家：${recentWinner}`;

  return (
    <div className="App">
      <p>一元夺宝</p>
      <p>{name} {currentRoundText}</p>
      <p>{currentPlayerText}</p>
      <p>{currentRoundPrizeText}</p>
      <p>{totalFundEmittedText}</p>
      <p>{previousWinnerText}</p>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6} md={6}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <TextField
              color='grey'
              id="title"
              label="Number of Tickets"
              value={ticket}
              onChange={selectTikcet}
              variant="standard"
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <TextField
              color='grey'
              id="title"
              label="Payable (BNB)"
              value={ticket * pricePerTicket}
              variant="standard"
              disabled={true}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={() => activateBrowserWallet()}
            disabled={account != undefined}
            variant='outlined'>
            {account != undefined ? "Connected" : "Connect"}
          </Button>
          <Button
            onClick={buyTicket}
            disabled={account == undefined}
            variant='outlined'>
            Buy Ticket
          </Button>
        </Grid>
      </Grid>
    </div >
  );
}

export default App;
