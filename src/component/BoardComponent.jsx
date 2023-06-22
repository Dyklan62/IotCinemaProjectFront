
import { useState,useEffect } from 'react';
import { useAppContext } from "../AppContext.jsx"

export const topicsEnum = {
  PEOPLE:'PEOPLE',
  TEMP:'TEMP',
  CLIM:'CLIM'
};

const BoardComponent = ({currentTopic}) => {
  const { client } = useAppContext();
  const [message, setMessage] = useState()
    
  const handleMessages = (topic,messageFromMqtt) => {
    if (topic == currentTopic) {
      const messageFromMqttString = messageFromMqtt.toString();
      setMessage(messageFromMqttString);
    }
  };

  useEffect(() => {
      client?.on('message', handleMessages);
      return () => {
        client?.off('message', handleMessages);
      };
  }, [client]);

    return (
            <div className='flex flex-col h-full overflow-x-auto mb-4' >
              <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                  <div className="grid grid-cols-10">
                      <div className="flex flex-row items-center">
                          <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                            {currentTopic == topicsEnum.TEMP ? message ? <div className="text-gray-600">{message}</div> :  <div className="text-red-600">20</div> : null}
                            {currentTopic == topicsEnum.CLIM ? message ?<div className="text-gray-600">{message == "true" ? "ON" : "OFF"}</div> :  <div className="text-red-600">OFF</div>:null}
                          </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    )
}

export default BoardComponent