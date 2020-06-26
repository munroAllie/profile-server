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

import ProfileTableRow from './ProfileTableRow';

export default function ProfileTable({ profiles, siteUrl, handleProfileRemove }) {
    return (
        <div className="grid-row">
            <table className="usa-table usa-table--borderless" width="100%">
                <thead>
                    <tr>
                        <th width="50%" scope="col">Name</th>
                        <th width="20%" scope="col">Updated</th>
                        <th width="10%" scope="col"></th>
                    </tr>
                </thead>
                <tbody style={{ lineHeight: 3 }}>
                    {(profiles && profiles.length > 0)
                        ? profiles.map((profile) => <ProfileTableRow key={profile.uuid} profile={profile} site_url={siteUrl} handleProfileRemove={handleProfileRemove}/>)
                        : <tr key={1}><td className="font-sans-xs" colSpan="6"><p>There are no concepts in this profile. Concepts created in this profile or added through import or statement templates will appear here.</p></td></tr>}
                </tbody>
            </table>
        </div>
    )
}