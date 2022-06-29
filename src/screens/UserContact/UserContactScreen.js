import React, {Fragment} from 'react';
import {CustomDataTable} from '../../settings/ComponentLib';

const UserContactScreen = () => {

    return (
        <Fragment>

            <CustomDataTable
                type="UserContact"
                searchPlaceholder="User Name..."
                tableHead={['username', 'name', 'designation', 'mail', 'Action']}
                tableDB={[
                    'username|text',
                    'name|text',
                    'designation|text',
                    'mail|text',
                    'id|action'
                ]}
                modalData={[
                    ['ID', ':', 'id|text'],
                    ['User Name', ':', 'userName|text'],
                    ['gender', ':', 'gender|text'],
                    ['email', ':', 'email|text'],
                    ['Mobile', ':', 'mobileNumber|text'],
                    ['Status', ':', 'isActive|status'],
                ]}
            />
        </Fragment>
    )
}


export default UserContactScreen;
