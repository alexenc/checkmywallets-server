import { useEffect, useState } from "react";

import {
  Avatar,
  Card,
  Container,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useParams } from "react-router";
import axiosClient from "../config/axios";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: "#ffffff",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='1' y2='0' gradientTransform='rotate(133,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%230FF'/%3E%3Cstop offset='1' stop-color='%23CF6'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='0' x2='0' y1='0' y2='1' gradientTransform='rotate(42,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%23F00'/%3E%3Cstop offset='1' stop-color='%23FC0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23FFF' fill-opacity='0' stroke-miterlimit='10'%3E%3Cg stroke='url(%23a)' stroke-width='7.589999999999999'%3E%3Cpath transform='translate(-93.8 2.4000000000000004) rotate(-3.5999999999999996 1409 581) scale(0.9339200000000001)' d='M1409 581 1450.35 511 1490 581z'/%3E%3Ccircle stroke-width='2.53' transform='translate(-125 74) rotate(5.2 800 450) scale(1.00266)' cx='500' cy='100' r='40'/%3E%3Cpath transform='translate(12.2 -69) rotate(35 401 736) scale(1.00266)' d='M400.86 735.5h-83.73c0-23.12 18.74-41.87 41.87-41.87S400.86 712.38 400.86 735.5z'/%3E%3C/g%3E%3Cg stroke='url(%23b)' stroke-width='2.3'%3E%3Cpath transform='translate(444 4.399999999999999) rotate(-1.0999999999999996 150 345) scale(0.99264)' d='M149.8 345.2 118.4 389.8 149.8 434.4 181.2 389.8z'/%3E%3Crect stroke-width='5.06' transform='translate(-109 -202) rotate(21.599999999999994 1089 759)' x='1039' y='709' width='100' height='100'/%3E%3Cpath transform='translate(-253.6 66.4) rotate(3.6000000000000014 1400 132) scale(0.83)' d='M1426.8 132.4 1405.7 168.8 1363.7 168.8 1342.7 132.4 1363.7 96 1405.7 96z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    height: "100vh",
    width: "100%",
  },
  link: {
    textDecoration: "none",
    marginLeft: 15,
    marginTop: 50,
    cursor: "pointer",
    color: "inherit",
  },
  centered: {
    width: "585px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "Translate(-50%, -50%)",
    [theme.breakpoints.down("sm")]: {
      width: "85%",
    },
  },
  card: {
    padding: 30,
    backgroundColor: "rgba(255, 255, 255, .25)",
    backdropFilter: "blur(5px)",
  },
  title: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 30,
  },
  avatar: {
    position: "relative",
    top: 19,
    right: 20,
  },
  wallet: {
    overflowWrap: "break-word",
  },
}));

function InfoCard() {
  const classes = useStyles();
  const [wallets, setWallets] = useState([]);
  const [user, setUser] = useState({});
  let { slug } = useParams();
  console.log("this is a test", slug);
  const getdata = async () => {
    const url = `/api/wallets/${slug}`;
    const url2 = `/api/users/${slug}`;
    const result = await axiosClient.get(url);
    const result2 = await axiosClient.get(url2);
    setWallets(result.data);
    setUser(result2.data);
  };

  useEffect(() => {
    getdata();
  }, [slug]);

  const copyToClipboard = (e) => {};
  return (
    <>
      <Container className={classes.centered}>
        <Card className={classes.card}>
          <Typography className={classes.title} variant="h2">
            {/*<Avatar
              src={user.avatar}
              variant="square"
              className={classes.avatar}
            />*/}
            {user.username}'s Wallets
          </Typography>
          <Typography>
            {wallets.map((wallet) => (
              <Typography className={classes.wallet}>
                {wallet.direction} - {wallet.type}
              </Typography>
            ))}
          </Typography>
        </Card>
      </Container>
      <div className={classes.bacgroundContainer}>
        <div className={classes.background}></div>
      </div>
    </>
  );
}

export default InfoCard;
