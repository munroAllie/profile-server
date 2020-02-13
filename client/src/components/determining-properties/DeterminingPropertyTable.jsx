/** ***************************************************************
* Copyright 2020 Advanced Distributed Learning (ADL)
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
**************************************************************** */
import React from 'react';
import { Link } from 'react-router-dom';
import DeterminingPropertyTableRow from './DeterminingPropertyTableRow';

export default function DeterminingPropertyTable(props) {
    return (<>
        <table className="usa-table usa-table--borderless" width="100%">
            <thead>
                <tr>
                    <th width="30%" scope="col">Property</th>
                    <th width="65%" scope="col">Concept</th>
                    <th width="5%" scope="col"></th>
                </tr>
            </thead>
            <tbody style={{ lineHeight: 3 }}>
                {(props.rules && props.rules.length > 0) ?
                    props.rules.map((rule, i) => <DeterminingPropertyTableRow key={i} {...rule} />) :
                    <tr key={1}><td className="font-sans-xs" colSpan="4">There are no statement rules associated with this profile. Add statement rules manually or import from a JSON file.</td></tr>
                }
            </tbody>
        </table>
        <Link
            to=''>
            <button className="usa-button">Add Determining Property</button>
        </Link>
    </>);
}
