import { ResponsivePie } from '@nivo/pie'
import React, { useState, useEffect } from 'react';
import axios from 'axios';



const ChartPage = () => {
    const [gen_puser, setGen] = useState([]);

    useEffect(() => {
        const getdata = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/chart_sample/');
            if (response.status === 200) {
                console.log('good')
                const gen_puser = response.data.data;
                console.log(gen_puser);
                setGen(gen_puser);
            }else if (response.status !== 200){
                console.log("연결 실패");
            }
            
            // if (!isComponentMounted){
            //     return;
            // }
            
            }catch(error){
                console.log("try 실패", error);
            }
    }
    getdata();

    // let isComponentMounted = true;

    
}, []);


    return (
        <>
       <div style={{ width: '800px', height: '500px', margin: '0 auto' , marginTop: '10%'}}>
                 <ResponsivePie
                //data
                data = {gen_puser}
                //margin
                margin = {{top: 40, right: 80, bottom: 80, left: 80 }}
                valueFormat=" >-f"
                //chart inner circle radius
                innerRadius={0.5}
                //pad 
                padAngle={0.7}
                //pad radius
                cornerRadius={3}
                activeInnerRadiusOffset={5}
                activeOuterRadiusOffset={8}
                //chart color
                colors={{scheme: 'set3'}}
                //pad border
                borderWidth={1}
                borderColor={{theme: 'background'}}
                arcLinkLabelsSkipAngle={2}
                arcLinkLabelsTextOffset={9}
                //link label color
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsOffset={9}
                arcLinkLabelsDiagonalLength={36}
                arcLinkLabelsStraightLength={36}
                arcLinkLabelsThickness={5}
                arcLinkLabelsColor={{from: 'color', modifiers: []}}
                arcLabel = "value"
                arcLabelsSkipAngle={10}
                arcLabelsTextColor="black"
                legends={[
                    {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }]
                    }
                ]}

            />;
            

        </div>
    </>
    )
};

export default ChartPage;
