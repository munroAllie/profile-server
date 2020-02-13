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
import { Link, } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeConceptFromTemplate } from "../../actions/templates"
import { removeConcept } from "../../actions/profiles"


export default function ConceptTableRow(props) {

    let dispatch = useDispatch();
    function removeClick() {
        if (props.inTemplate)
            return dispatch(removeConceptFromTemplate(props))
        if (!props.inTemplate)
            return dispatch(removeConcept(props))
    }
    return (
        <tr>
            <th width="20%" scope="row">
                <Link
                    to={`${props.site_url}/${props.uuid}`}
                >
                    <span>{props.name}</span>
                </Link>
            </th>

            <td><span width="20%" className="font-sans-3xs">{props.type}</span></td>
            <td><span width="20%" className="font-sans-3xs">{props.parentProfile.name}</span></td>
            {!props.inTemplate ? <td><span width="20%" className="font-sans-3xs">{props.fromTemplate}</span></td> : null}
            <td><span width="10%" className="font-sans-3xs">{props.updatedOn}</span></td>

            {props.fromTemplate == 0 || props.inTemplate ? <td>
                <button onClick={() => removeClick()} className="usa-button  usa-button--unstyled"><span className="text-bold">Remove</span></button>
            </td> : <td></td>}
            {/* <td><button className="usa-button  usa-button--unstyled"><span className="text-bold">Remove</span></button> </td> */}
        </tr>
    );
}
