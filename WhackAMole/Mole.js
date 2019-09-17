import React, { Component } from 'react';
import { View, StyleSheet, Button, Image } from 'react-native';
import Images from './assets/Images';
import SpriteSheet from 'rn-sprite-sheet';
import Constants from './Constants';

export default class Mole extends Component {
    constructor(props){
        super(props);

        this.mole = null;
    }

    render(){
        return (
            <SpriteSheet
                ref={ref => (this.mole = ref)}
                source={Images.sprites}
                columns={6}
                rows={8}
                // height={200} // set either, none, but not both
                // width={200}
                //width={100}
                width={100}
                animations={{
                    idle: [0],
                    appear: [1, 2, 3, 4],
                    hide: [4, 3, 2, 1, 0],
                }}
            />
        )
    }
}
