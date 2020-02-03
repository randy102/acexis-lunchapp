import React, { useState, useEffect } from "react";
import { Icon, Divider, Button, Row, Col, message } from "antd";
import moment from "moment";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CONFIG, UPDATE_CONFIG } from "../../graphql/config";
import TimeKeeper from "react-timekeeper";

export default function Config() {
    const [order, setOrder] = useState("00:00");
    const [closeConfirm, setConfirm] = useState("00:00");
    const [startConfirm, setStartConfirm] = useState("00:00");
    const [forceRefetch, setForceRefetch] = useState(true);
    const { data, refetch } = useQuery(GET_CONFIG);
    const [update, { data: afterUpdate }] = useMutation(UPDATE_CONFIG);
    

    function handleSave() {
        update({variables:{
            closeConfirm,
            startConfirm,
            order
        }});

    }

    useEffect(() => {
        if (data) {
            setOrder(data.config.closeOrder);
            setConfirm(data.config.closeConfirm);
            setStartConfirm(data.config.startConfirm);
        }
        
    }, [data, forceRefetch]);

    useEffect(()=>{
        if(afterUpdate){
            refetch();
            message.success("Saved!");
        }
    }, [afterUpdate])

    console.log({order,closeConfirm});
    return (
        <div>
            <Divider>
                <h1>
                    <Icon type="setting" /> Config
                </h1>
            </Divider>

            <Row type="flex" justify="space-around" align="middle">
                <Col span={8} style={{textAlign: "center"}}>
                    <h3>Automately close menu at: </h3>
                    <TimeKeeper
                        time={order}
                        hour24Mode
                        onChange={newTime => setOrder(newTime.formatted24)}
                    />
                </Col>

                <Col span={8} style={{textAlign: "center"}}>
                    <h3>Close confirming at: </h3>
                    <TimeKeeper
                        time={closeConfirm}
                        hour24Mode
                        onChange={newTime => setConfirm(newTime.formatted24)}
                    />
                </Col>

                <Col span={8} style={{textAlign: "center"}}>
                    <h3>Start confirming at: </h3>
                    <TimeKeeper
                        time={startConfirm}
                        hour24Mode
                        onChange={newTime => setStartConfirm(newTime.formatted24)}
                    />
                </Col>
            </Row>

            <div style={{textAlign: "center", marginTop:"20px"}}>
                
                <Button style={{margin:10}} type="primary" onClick={handleSave}>
                    Save
                </Button>
                <Button  style={{margin:10}}  type="danger" onClick={() => setForceRefetch(!forceRefetch)}>
                    Reset
                </Button>
            </div>
            
        </div>
    );
}
