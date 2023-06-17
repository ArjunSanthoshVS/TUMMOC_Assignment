import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import * as api from '../Redux/api'

function CitiesComp() {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.cities();
                console.log(response);
                setCities(response?.data);
                console.log(cities);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className='col-12 d-flex'>
                {cities.map((city) => (
                    <div className="col-3 m-4">
                        <Card key={city?.cityData?._id} style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{city?.cityData?.city}</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </>
    );
}

export default CitiesComp;
