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
const User = require('../ODM/models').user;

module.exports.getMembers = async function(req, res, next) {
    await req.resource.populate({ path: 'members.user', select: 'uuid username' }).execPopulate();
    const members = req.resource.toObject({ virtuals: true }).members;
    res.send({
        success: true,
        members,
    });
};


module.exports.addMember = async function (req, res, next) {
    // member must exist;
    const member = await User.findOne({ _id: req.body.user.id });
    if (!member) { return next(new Error('User not found in add member')); }

    for (const i in req.resource.members) {
        if (req.resource.members[i].user.toString() == req.body.user.id) {
            await req.resource.populate({ path: 'members.user', select: 'uuid username' }).execPopulate();
            const members = req.resource.toObject({ virtuals: true }).members;
            return res.send({
                success: false,
                message: 'User already in org',
                members,
            });
        }
    }

    req.resource.members.push({
        level: req.body.level,
        user: req.body.user.id,
    });
    await req.resource.save();
    await req.resource.populate({ path: 'members.user', select: 'uuid username' }).execPopulate();
    const members = req.resource.toObject({ virtuals: true }).members;
    return res.send({
        success: true,
        members: members,
    });
};

module.exports.updateMember = async function (req, res, next) {
    // member must exist;
    const member = await User.findOne({ uuid: req.body.uuid });
    if (!member) { return next(new Error('User not found in add member')); }

    for (const i in req.resource.members) {
        if (req.resource.members[i].uuid == req.body.uuid) {
            req.resource.members[i].level = req.body.level;
            await req.resource.save();
            return res.send({
                success: true,
                members: req.resource.members,
            });
        }
    }
    return res.send({
        success: false,
        message: 'member not found in org',
    });
};

module.exports.removeMember = async function (req, res, next) {
    // member must exist;
    const member = await User.findOne({ _id: req.params.memberId });
    if (!member) { return next(new Error('User not found in add member')); }
    let idx = -1;
    for (const i in req.resource.members) {
        if (req.resource.members[i].user.toString() == req.params.memberId) {
            idx = i;
        }
    }
    if (idx === -1) {
        return res.send({
            success: false,
            message: 'member not found in org',
        });
    }
    req.resource.members.splice(idx, 1);
    await req.resource.save();
    await req.resource.populate({ path: 'members.user', select: 'uuid username' }).execPopulate();
    const members = req.resource.toObject({ virtuals: true }).members;
    return res.send({
        success: true,
        members,

    });
};