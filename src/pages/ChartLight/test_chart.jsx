import { ResponsivePie } from '@nivo/pie'
import {ResponsiveLine} from '@nivo/line'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'styles/chart.css'




const ChartPage = () => {
    const [gen_puser, setGen] = useState([]);
    const [m_performance, setM_Performance] = useState([]);
    const [ctcl_puser, setCtcl] = useState([]);

    useEffect(() => {
        const getdata = async () => {
        try {
            // const response = await axios.get('http://hello00back.net/chart_sample/');
            const response = await axios.get('http://127.0.0.1:8000/chart_sample/');
            if (response.status === 200) {
                console.log('good')
                const gen_puser = response.data.data[0];
                const m_performance = response.data.data[1];
                const ctcl_puser = response.data.data[2];
                console.log(gen_puser);
                setGen(gen_puser);
                setM_Performance(m_performance);
                setCtcl(ctcl_puser);
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

    // const currentDate = new Date();

    // // Extract year, month, and day components
    // const year = currentDate.getFullYear();
    // const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    // const day = currentDate.getDate().toString().padStart(2, '0');

    // // Format the date as a string
    // const formattedDate = `${year}${month}${day}`;

    // console.log(formattedDate)

    

    // let isComponentMounted = true;

    
}, []);


   


    return (
       
        
        <div style={{alignItems:'center' , marginTop: '10%'}}>
           
           <ResponsivePie 
            data = {gen_puser}
            valueFormat=" >-.2f"
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeInnerRadiusOffset={5}
            activeOuterRadiusOffset={8}
            colors={{scheme: 'set3'}}
            borderWidth={1}
            borderColor={{theme: 'background'}}
            arcLinkLabelsSkipAngle={2}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsTextOffset={9}
            arcLinkLabelsDiagonalLength={0}
            arcLinkLabelsThickness={5}
            arcLinkLabelsColor={{from: 'color', modifiers: []}}
            arcLabel="value"
            arcLabelsSkipAngle={10}
            arcLabelsTextColor="black"
            legends={[
                {
                    anchor: 'right',
                    direction: 'column',
                    justify: false,
                    translateX: -380,
                    translateY: 60,
                    itemsSpacing: 0,
                    itemWidth: 200,
                    itemHeight: 23, 
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 13,
                    symbolShape: 13,
                    effects: [
                        {
                            on: 'hover',
                            style:{
                                itemTextColor: '#000'
                            }
                        }
                       
                    ]
                }
            ]}
           />
        
           
        </div>

    )
};

export default ChartPage;
