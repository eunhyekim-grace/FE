import { ResponsivePie } from '@nivo/pie'
import {ResponsiveLine} from '@nivo/line'
import React, { useState, useEffect } from 'react';
import axios from 'axios';




const ChartPage = () => {
    const [gen_puser, setGen] = useState([]);
    const [m_performance, setM_Performance] = useState([]);
    const [ctcl_puser, setCtcl] = useState([]);

    useEffect(() => {
        const getdata = async () => {
        try {
            const response = await axios.get('http://hello00back.net/chart_sample/');
            // const response = await axios.get('http://127.0.0.1:8000/chart_sample/');
            if (response.status === 200) {
                console.log('good')
                const gen_puser = response.data.data[0];
                const m_performance = response.data.data[1];
                const ctcl_puser = response.data.data[2];
                console.log(m_performance);
                setGen(gen_puser);
                setCtcl(ctcl_puser);
                setM_Performance(m_performance)
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


    const GenreComponentStyle = {
        width: '100%',
        position: 'absolute',
        height: '50%',
        marginTop: '-37%',
        marginLeft: '-30%',
        display:'visible',
        zIndex:2,
        
    };

    const PerformanceComponentStyle = {
        width: '100hv',
        marginLeft:'50%',
        height: '700px',
        zIndex:1,
       
    };



    return (
       
        
            <div style={{alignItems:'center' , marginTop: '10%'}}>
                <div style = {PerformanceComponentStyle} >
            <ResponsiveLine
            
                data = {m_performance}
                margin={{top: 10, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: true,
                reverse: false
                }}
                yFormat=" >-.2f"
                curve="cardinal"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Date',
                        legendOffset: 36,
                        legendPosition: 'middle'
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Performance',
                    legendOffset: -40,
                    legendPosition: 'middle'
                }}
                colors={{ scheme: 'nivo' }}
                lineWidth={4}
                pointSize={7}
                pointColor={{ from: 'color', modifiers: [] }}
                pointBorderWidth={1}
                pointBorderColor={{ from: 'serieColor', modifiers: [] }}
                pointLabelYOffset={-12}
                crosshairType="bottom"
                useMesh={true}
                legends={[
                {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 300,
                translateY: 10,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 78,
                itemHeight: 23,
                itemOpacity: 0.75,
                symbolSize: 13,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
                }
                ]}
        
            />
            </div>
            <div style= {GenreComponentStyle}>
            <ResponsivePie
                //data
                data = {gen_puser}
                //margin
                
                
                valueFormat=" >-.2f"
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
                arcLinkLabelsDiagonalLength={0}
                arcLinkLabelsStraightLength={0}
                arcLinkLabelsThickness={5}
                arcLinkLabelsColor={{from: 'color', modifiers: []}}
                arcLabel = "value"
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
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            }
                        ]
                    }
                ]}

            />
            </div>

            <div>
            <ResponsivePie
                //data
                data = {ctcl_puser}
                //margin
                style= {{zIndex:'3', left:'0', }}
                
                valueFormat=" >-.2f"
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
                arcLinkLabelsDiagonalLength={0}
                arcLinkLabelsStraightLength={0}
                arcLinkLabelsThickness={5}
                arcLinkLabelsColor={{from: 'color', modifiers: []}}
                arcLabel = "value"
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
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            }
                        ]
                    }
                ]}

            />
            </div>
        </div>

    )
};

export default ChartPage;
