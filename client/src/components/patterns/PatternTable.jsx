/** ***********************************************************************
*
* Veracity Technology Consultants
* __________________
*
*  2019 Veracity Technology Consultants
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Veracity Technology Consultants and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Veracity Technology Consultants
* and its suppliers and may be covered by U.S. and Foreign Patents,
* patents in process, and are protected by trade secret or copyright law.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Veracity Technology Consultants.
*/
import React from 'react';
import { Link } from 'react-router-dom';

export default function PatternTable(props) {
    return (<>
        <div className="grid-row">
            <div className="desktop:grid-col">
                <h2>Patterns</h2>
            </div>
        </div>
        <div className="grid-row">
            <table className="usa-table usa-table--borderless" width="100%">
                <thead>
                    <tr>
                        <th width="45%" scope="col">Name</th>
                        <th width="7" scope="col">Primary</th>
                        <th width="13%" scope="col">Type</th>
                        <th width="21%" scope="col">Profile</th>
                        <th width="14%" scope="col">Updated</th>
                        <th width="2%" scope="col"></th>
                    </tr>
                </thead>
                <tbody style={{ lineHeight: 3 }}>
                    {(props.patterns && props.patterns.length > 0) ?
                        props.patterns.map((pattern, i) => <PatternTableRow key={i} {...pattern} root_url={props.root_url} />) :
                        <tr key={1}><td className="font-sans-xs" colSpan="6">There are no patterns associated with this profile. Add a pattern to define relationships between your xAPI statements.</td></tr>
                    }
                </tbody>
            </table>
        </div>
        <div className="grid-row padding-top-2">
            <div className="desktop:grid-col-3">
                {/* <button className="usa-button ">Add Pattern</button> */}
                <Link to={`${props.root_url}/add`} className="usa-button">Add Pattern</Link>
            </div>
        </div>
    </>);
}

function PatternTableRow(props) {
    return (
        <tr>
            <th scope="row">
                <Link
                    to={`${props.root_url}/${props.id}`}>
                    <span>{props.name}</span>
                </Link>
            </th>
            <td><span className="font-sans-3xs">{props.primary}</span></td>
            <td><span className="font-sans-3xs">{props.type}</span></td>
            <td><span className="font-sans-3xs">{props.parentProfileName}</span></td>
            <td><span className="font-sans-3xs">{props.updated}</span></td>
            <td><button className="usa-button  usa-button--unstyled"><span className="text-bold">Remove</span></button> </td>
        </tr>
    );
}