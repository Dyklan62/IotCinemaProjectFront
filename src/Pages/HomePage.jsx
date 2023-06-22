import { useState,useEffect } from 'react'
import '../App.css'
import { useAppContext} from "../AppContext.jsx"
import Board from './Board.jsx'
import mqtt from 'mqtt'
import { Heading,Stack,AbsoluteCenter,Divider,Box } from '@chakra-ui/react'

const HomePage = () => {
    const { setClient } = useAppContext();
    const [topics] = useState(['PEOPLE','TEMP','CLIM']);
  
    useEffect(() => {
      const mqttClient = mqtt.connect('wss://631c748724bc4a78bf14eddc2f2133a9.s2.eu.hivemq.cloud:8884/mqtt', {
        username: 'dyklan',
        password: 'Pgb2p2A8S9hUf8',
        clientId: "Cinema",
        protocolVersion: 4,
        connectTimeout: 4000,
        keepalive: 60,
        clean: true,
        reconnectPeriod: 1000,
        rejectUnauthorized: false,
        will: {
          topic: 'Main',
          payload: 'Connection Closed abnormally..!',
          qos: 0,
          retain: false
        },
        transformWsUrl: (url) => {
          return url;
        }
      });

      mqttClient.on('connect', () => {
        console.log('connected to MQTT broker');
        setClient(mqttClient);
        topics.forEach((topic) => mqttClient.subscribe(`${topic}`, { qos: 1 }))
      });

      
      mqttClient.on('error', e => {
        console.log('Error', e);
      });

      mqttClient.on('close', () => {
        mqttClient.end();
      });

  },[]);

  
  return (
    <Stack spacing={3}>
      <Heading as='h1' size='lg' noOfLines={1}>
        Gestion du cinéma
      </Heading>
      <Box position='relative' padding='10'>
        <Divider />
        <AbsoluteCenter  px='15'>
          Paramètre des capteurs
        </AbsoluteCenter>
      </Box>
      <Board/>
    </Stack>
  );
}

export default HomePage;    
