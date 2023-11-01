import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { withBadge, Badge, Icon, Avatar } from 'react-native-elements';

export default function FCBadge(props) {
    const[count, setCount]=useState(props.number);

    return (
        <View style={styles.container}>
            {count > 0 &&
                <View style={styles.row}>
                    {/* <Icon type="ionicon" name="ios-notifications" size={65} color="red" /> */}
                    {/* <Badge value={count} status="error" containerStyle={styles.badgeStyle} /> */}
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    text: {
        fontSize: 18
    },
    row: {
        flexDirection: 'row'
    },
    badgeStyle: {
        position: 'absolute',
        top: -4,
        right: -4
    }
});
