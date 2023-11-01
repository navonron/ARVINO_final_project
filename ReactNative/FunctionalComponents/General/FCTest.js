import React, { Component } from 'react';
import { View, Image, Animated, StyleSheet, Easing } from 'react-native';
import arvino from '../../assets/ARVINO.png';
import helpers from '../../helpers/helperFunctions';

export default class Circle extends Component {
    constructor() {
        super();
        this.animated = new Animated.Value(0);
        var inputRange = [0, 1];
        var outputRange = ['0deg', '360deg'];
        this.rotate = this.animated.interpolate({ inputRange, outputRange });
        outputRange = ['0deg', '-360deg'];
        this.rotateOpposit = this.animated.interpolate({ inputRange, outputRange });
    }
     colors = ["#9B0000", "#6D0000", "#580000", "#430000",
    "#E96245", "#F4AC90", "#F1E6CD", "#ED8A68"];

    sizes = [60, 80, 100, 120, 70, 80, 90, 50];

    componentDidMount() {
        this.animate();
    }
    animate() {
        Animated.loop(
            Animated.timing(this.animated, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true,
                easing: Easing.quad,
            }),
        ).start();
    }

    render() {
        const transform = [{ rotate: this.rotate }];
        const transform1 = [{ rotate: this.rotateOpposit }];
        return (
            <View style={styles.container}>
                <Animated.View style={[styles.item, { transform }]}>
                    <Animated.View style={[styles.topItem, { transform: transform1 }]}>
                        <Image
                            source={{  arvino }}
                            style={{
                                padding: 10,
                                margin: 10,
                                marginLeft: 16,
                                width: 100,
                                height: 100,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 50,
                                borderColor: '#9B0000',
                                borderWidth: 4
                            }}
                        ></Image>
                    </Animated.View>
                </Animated.View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        position: 'absolute',
        width: 100,
        height: 200, // this is the diameter of circle
    },
    topItem: {
        width: '100%',
        height: 20,
        backgroundColor: 'red',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
    },
});