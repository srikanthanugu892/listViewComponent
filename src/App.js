import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://cors-anywhere.herokuapp.com/https://fetch-hiring.s3.amazonaws.com/hiring.json',
            );
            setData(groupBy(result.data, 'listId'));
        };

        fetchData();
    }, []);

    const groupBy = (array, key) => {
        // Return the end result
        return array.reduce((result, currentValue) => {
            // If an array already present for key, push it to the array. Else create an array and push the object
            // This is how the above code in multiple line
            if (!result[currentValue[key]]) {
                result[currentValue[key]] = [];
            }
            if (currentValue.name) {
                result[currentValue[key]].push(currentValue);
            }
            // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
            return result;
        }, {}); // empty object is the initial value for result object
    };

    return (
        <div className="list-layout">
            {Object.keys(data).sort((a, b) => parseInt(a) - parseInt(b)).map((item, index) => {
                return (
                    <ul key={index}>
                        <h4>List Id - {item}</h4>
                        {data[item].sort((a, b) => a.name.localeCompare(b.name, undefined, {
                            numeric: true,
                            sensitivity: 'base'
                        })).map(list => (
                            <li key={list.id}>
                                {list.name}
                            </li>
                        ))}
                    </ul>
                )
            })}
        </div>
    );
}

export default App;


