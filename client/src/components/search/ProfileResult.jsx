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
import React, {useState} from "react";

export default function ProfileResult({result}) {
return <div className = "grid-row profile-result">
    <div className="grid-col-10">
        <p><a href="#">{result.name}</a></p>
        <p><strong>{new Date(result.createdOn).toDateString()} - {result.organization && result.organization.name}</strong><br></br>
        {result.description}</p>
        <div className="tags">{result.tags && result.tags.map( i=> <span className="usa-tag display-inline-flex bg-accent-cool-lighter text-base-darkest padding-y-05 margin-right-1" ><span className="margin-05">{i}</span></span>)}</div>
    </div>
    <div className="grid-col-2 padding-2">
        <div className="bg-base-lightest profile-search-counts">
            <div><strong>{result.concepts.length}</strong> concepts</div>
            <div><strong>{result.templates.length}</strong> templates</div>
            <div><strong>{result.patterns.length}</strong> patterns</div>
        </div>
        <div className="">
            See similar
        </div>
    </div>
</div>
}