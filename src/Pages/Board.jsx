
import ChatComponent from '../component/BoardComponent.jsx'
import { useAppContext } from "../AppContext.jsx"
import { topicsEnum } from "../component/BoardComponent.jsx"
import { useState } from 'react'
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import {  HStack, Box, Badge } from '@chakra-ui/react'

export const Board = () => {
  const { client } = useAppContext();
  const topics = ['PEOPLE','TEMP','CLIM'];
  const [peopleValue, setPeopleValue] = useState(0);

  const sendMessage = (topic,message) => {
    client.publish(`${topic}`, `${message}`);
  };

  const handleInputMessage = (valueString) => {
    setPeopleValue(valueString);
    sendMessage(`${topicsEnum.PEOPLE}`,`${valueString}`);
  };
  
  return (
    <div className='Chatdiv w-full'>
        <div>
        <HStack spacing='6'>
        {topics.map((topic,index) => {
            return (
              <Box boxShadow='lg' maxW='sm' p={5} m={4} w={80} borderWidth='1px' borderRadius='lg' overflow='hidden' key={index}>
                <Badge m={3} borderRadius='full' px='2' colorScheme='teal'>
                  {topic}
                </Badge>
                  {topic == topicsEnum.PEOPLE ? 
                  <NumberInput 
                    onChange={(valueString) => handleInputMessage(valueString)}
                    defaultValue={peopleValue}
                    max={50}
                    >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  :<ChatComponent currentTopic={topic} />
                  }
              </Box>
            )})
        }
        </HStack>
        </div>
    </div>
  );
};
export default Board
