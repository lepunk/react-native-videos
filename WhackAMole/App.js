import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Button,
    Image,
    SafeAreaView,
    Text,
    TouchableWithoutFeedback
} from 'react-native';
import Images from './assets/Images';
import SpriteSheet from 'rn-sprite-sheet';
import Constants from './Constants';
import Mole from './Mole';
import GameOver from './GameOver';
import Clear from './Clear';
import Pause from './Pause';

const DEFAULT_TIME = 5;
const DEFAULT_STATE = {
    level: 1,
    score: 0,
    time: DEFAULT_TIME,
    cleared: false,
    paused: false,
    gameover: false,
    health: 100
}

export default class App extends Component {
    constructor(props){
        super(props);
        this.moles = [];
        this.state = DEFAULT_STATE;
        this.interval = null;
        this.timeInterval = null;
    }

    componentDidMount = () => {
        this.setState(DEFAULT_STATE, this.pause);
    }

    setupTicks = () => {
        let speed = 750 - (this.state.level * 50);
        if (speed < 350){
            speed = 350;
        }
        this.interval = setInterval(this.popRandomMole, speed);
        this.timeInterval = setInterval(this.timerTick, 1000);

    }

    reset = () => {
        this.molesPopping = 0;

        this.setState(DEFAULT_STATE, this.setupTicks);
    }

    pause = () => {
        if (this.interval) clearInterval(this.interval);
        if (this.timeInterval) clearInterval(this.timeInterval);
        this.setState({
            paused: true
        });
    }

    resume = () => {
        this.molesPopping = 0;
        this.setState({
            paused: false
        }, this.setupTicks);
    }

    nextLevel = () => {
        this.molesPopping = 0;

        this.setState({
            level: this.state.level + 1,
            cleared: false,
            gameover: false,
            time: DEFAULT_TIME
        }, this.setupTicks)
    }

    timerTick = () => {
        if (this.state.time === 0){
            clearInterval(this.interval);
            clearInterval(this.timeInterval);
            this.setState({
                cleared: true
            })
        } else {
            this.setState({
                time: this.state.time - 1
            })
        }
    }

    randomBetween = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    onFinishPopping = (index) => {
        this.molesPopping -= 1;
    }

    popRandomMole = () => {
        if (this.moles.length != 12){
            console.log(this.moles.length);
            return;
        }

        let randomIndex = this.randomBetween(0, 11);
        if (!this.moles[randomIndex].isPopping && this.molesPopping < 3){
            this.molesPopping += 1;
            this.moles[randomIndex].pop();
        }
    }

    onScore = () => {
        this.setState({
            score: this.state.score + 1
        })
    }

    onDamage = () => {
        if (this.state.cleared || this.state.gameOver || this.state.paused){
            return;
        }

        let targetHealth = this.state.health - 10 < 0 ? 0 : this.state.health - 10;

        this.setState({
            health: targetHealth
        });

        if (targetHealth <= 0){
            this.gameOver();
        }
    }

    gameOver = () => {
        clearInterval(this.interval);
        clearInterval(this.timeInterval);

        this.setState({
            gameover: true
        });
    }

    onHeal = () => {
        let targetHealth = this.state.health + 10 > 100 ? 100 : this.state.health + 10;
        this.setState({
            health: targetHealth
        });
    }

    render(){
        let healthBarWidth = (Constants.MAX_WIDTH - Constants.XR * 100 - Constants.XR * 60 - Constants.XR * 6) * this.state.health / 100;
        return (
            <View style={styles.container}>
                <Image style={styles.backgroundImage} resizeMode="stretch" source={Images.background} />
                <View style={styles.topPanel}>
                    <SafeAreaView>
                        <View style={styles.statsContainer}>
                            <View style={styles.stats}>
                                <View style={styles.levelContainer}>
                                    <Text style={styles.levelTitle}>Level</Text>
                                    <Text style={styles.levelNumber}>{this.state.level}</Text>
                                </View>
                            </View>
                            <View style={styles.stats}>
                                <View style={styles.timeBar}>
                                    <Text style={styles.timeNumber}>{this.state.time}</Text>
                                </View>
                                <Image style={styles.timeIcon} resizeMode="stretch" source={Images.timeIcon} />
                            </View>
                            <View style={styles.stats}>
                                <View style={styles.scoreBar}>
                                    <Text style={styles.scoreNumber}>{this.state.score}</Text>
                                </View>
                                <Image style={styles.scoreIcon} resizeMode="stretch" source={Images.scoreIcon} />
                            </View>
                            <View style={styles.stats}>
                                <TouchableWithoutFeedback onPress={this.pause}>
                                    <View style={styles.pauseButton}>
                                        <Image style={styles.pauseButtonIcon} resizeMode="stretch" source={Images.pauseIcon} />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>

                        <View style={styles.healthBarContainer}>
                            <View style={styles.healthBar}>
                                <View style={[styles.healthBarInner, { width: healthBarWidth}]} />
                            </View>
                            <Image style={styles.healthIcon} resizeMode="stretch" source={Images.healthIcon} />
                        </View>
                    </SafeAreaView>
                </View>
                <View style={styles.playArea}>
                    {Array.apply(null, Array(4)).map((el, rowIdx) => {
                        return (
                            <View style={styles.playRow} key={rowIdx}>
                                {Array.apply(null, Array(3)).map((el, colIdx) => {
                                    let moleIdx = (rowIdx * 3) + colIdx;

                                    return (
                                        <View style={styles.playCell} key={colIdx}>
                                            <Mole
                                                index={moleIdx}
                                                ref={(ref) => { this.moles[moleIdx] = ref }}
                                                onFinishPopping={this.onFinishPopping}
                                                onDamage={this.onDamage}
                                                onHeal={this.onHeal}
                                                onScore={this.onScore}
                                            />
                                        </View>
                                    )
                                })}
                            </View>
                        )
                    })}
                </View>
                {this.state.cleared && <Clear onReset={this.reset} onNextLevel={this.nextLevel} level={this.state.level} score={this.state.score} />}
                {this.state.gameover && <GameOver onReset={this.reset} level={this.state.level} score={this.state.score} />}
                {this.state.paused && <Pause onReset={this.reset} onResume={this.resume} />}
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },

    backgroundImage: {
        width: Constants.MAX_WIDTH,
        height: Constants.MAX_HEIGHT,
        position: 'absolute'
    },
    topPanel: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: Constants.YR * 250,
        flexDirection: 'column'
    },
    statsContainer: {
        width: Constants.MAX_WIDTH,
        height: Constants.YR * 120,
        flexDirection: 'row'
    },
    stats: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pauseButton: {
        width: Constants.YR * 50,
        height: Constants.YR * 50,
        backgroundColor: 'black',
        borderColor: 'white',
        borderWidth: 3,
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pauseButtonIcon: {
        width: Constants.YR * 25,
        height: Constants.YR * 25,
    },
    levelContainer: {
        width: Constants.YR * 80,
        height: Constants.YR * 80,
        backgroundColor: '#ff1a1a',
        borderColor: 'white',
        borderWidth: 3,
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    levelTitle: {
        fontSize: 21,
        color: 'white',
        fontFamily: 'LilitaOne'
    },
    levelNumber: {
        fontSize: 17,
        color: 'white',
        fontFamily: 'LilitaOne'
    },
    scoreIcon: {
        position: 'absolute',
        left: 0,
        width: Constants.YR * 40,
        height: Constants.YR * 40,
    },
    scoreBar: {
        height: Constants.YR * 25,
        position: 'absolute',
        left: 20,
        right: 5,
        backgroundColor: 'white',
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scoreNumber: {
        fontSize: 17,
        color: 'black',
        fontFamily: 'LilitaOne',
    },
    timeIcon: {
        position: 'absolute',
        left: 0,
        width: Constants.YR * 40,
        height: Constants.YR * 40,
    },
    timeBar: {
        height: Constants.YR * 25,
        position: 'absolute',
        left: 20,
        right: 5,
        backgroundColor: 'white',
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center'
    },
    timeNumber: {
        fontSize: 17,
        color: 'black',
        fontFamily: 'LilitaOne',
    },
    healthBarContainer: {
        height: Constants.YR * 40,
        width: Constants.MAX_WIDTH - Constants.XR * 120,
        marginLeft: Constants.XR * 60
    },
    healthIcon: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: Constants.YR * 46,
        height: Constants.YR * 40,
    },
    healthBar: {
        height: Constants.YR * 20,
        width: Constants.MAX_WIDTH - Constants.XR * 100 - Constants.XR * 60,
        marginLeft: Constants.XR * 40,
        marginTop: Constants.YR * 10,
        backgroundColor: 'white',
        borderRadius: Constants.YR * 10
    },
    healthBarInner: {
        position: 'absolute',
        backgroundColor: '#ff1a1a',
        left: Constants.XR * 3,

        top: Constants.YR * 3,
        bottom: Constants.YR * 3,
        borderRadius: Constants.YR * 8
    },
    playArea: {
        width: Constants.MAX_WIDTH,
        marginTop: Constants.YR * 250,
        height: Constants.MAX_HEIGHT - Constants.YR * 250 - Constants.YR * 112,
        flexDirection: 'column',
    },
    playRow: {
        height: (Constants.MAX_HEIGHT - Constants.YR * 250 - Constants.YR * 112) / 4,
        width: Constants.MAX_WIDTH,
        flexDirection: 'row',
    },
    playCell: {
        width: Constants.MAX_WIDTH / 3,
        height: (Constants.MAX_HEIGHT - Constants.YR * 250 - Constants.YR * 112) / 4,
        alignItems: 'center'
    }
});
