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

export default function ProfileTableRow({ profile, site_url, handleProfileRemove }) {
    return (
        <tr>
            <th width="20%" scope="row">
                {
                    profile && profile.currentDraftVersion ?
                        <Link
                                to={`${site_url}/profile/${profile.uuid}/version/${profile.currentDraftVersion.uuid}`}
                                className="usa-link button-link"
                        >
                            {profile.currentDraftVersion.name}
                        </Link> :
                        <Link
                                to={`${site_url}/profile/${profile.uuid}/version/${profile.currentPublishedVersion.uuid}`}
                                className="usa-link button-link"
                        >
                            {profile.currentPublishedVersion.name}
                        </Link>
                }
            </th>
            <td><span className="font-sans-3xs">{(profile.updatedOn) ? (new Date(profile.updatedOn)).toLocaleDateString() : 'Unknown'}</span></td>
            <td>
                <button onClick={() => handleProfileRemove(profile)} className="usa-button  usa-button--unstyled"><span className="text-bold">Remove</span></button>
            </td>
          

        </tr>
    )
}