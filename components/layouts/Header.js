import * as React from 'react';
import { Appbar } from 'react-native-paper';

import Icon from 'react-native-vector-icons/EvilIcons';
import { Ionicons } from '@expo/vector-icons';

export default class MyComponent extends React.Component {
    _goBack = () => console.log('Went back');

    _handleSearch = () => console.log('Searching');

    _handleMore = () => console.log('Shown more');

    render() {
        return (
            <Appbar.Header>
                <Appbar.BackAction
                    onPress={this._goBack}
                />
                <Appbar.Content
                    title="Bustimer"
                />
                <Appbar.Action icon="account-arrow-left-outline" onPress={this._handleMore} />
                <Appbar.Action icon="more-vert" onPress={this._handleMore} />
            </Appbar.Header>
        );
    }
}
