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
  useRecentWinner,
  useAPR,
  useApprove
} from './hooks';

const token = 'BNB';
const native = token == 'BNB';
const index = 3;
const {
  name, pricePerTicket, prize, ticketPerRound, address
} = config[token][index];

function App() {
  const { account } = useEthers();
  const [ticket, setTicket] = useState(1);
  const count = usePlayerCount(token, index);
  const recentWinner = useRecentWinner(token, index);
  const totalFundEmitted = useTotalFundEmitted(token, index);
  const round = useRound(token, index);
  const { enter } = useEnter(token, index, pricePerTicket, native);
  const { approve } = useApprove(token, index, pricePerTicket);

  const selectTikcet = (event) => {
    let text = event.target.value;
    setTicket(parseInt(text));
  };
  const buyTicket = (event) => {
    enter(ticket);
  };

  const apr = useAPR();

  const currentRoundText = `第${round}轮`;
  const currentPlayerText = `参与玩家: ${count} / ${ticketPerRound}`;
  const currentRoundPrizeText = `本轮奖金：${prize} ${token}`;
  const totalFundEmittedText = `历史奖金：${totalFundEmitted} ${token}`;
  const previousWinnerText = `上轮赢家：${recentWinner}`;
  const stakingRewardText = `质押年化收益: ${apr.toFixed(2)}%`;

  return (
    <div className="App">
      <p>一元夺宝</p>
      <p>{name} {currentRoundText}</p>
      <p>{currentPlayerText}</p>
      <p>{currentRoundPrizeText}</p>
      <p>{totalFundEmittedText}</p>
      <p>{previousWinnerText}</p>
      <p>{stakingRewardText}</p>
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
              label={`Payable ${token}`}
              value={ticket * pricePerTicket}
              variant="standard"
              disabled={true}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          {/* <Button
            onClick={() => activateBrowserWallet()}
            disabled={account != undefined}
            variant='outlined'>
            {account != undefined ? "Connected" : "Connect"}
          </Button> */}
          {native || <Button
            onClick={() => approve(address, ticket)}
            variant='outlined'>
            Approve
          </Button>}
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
