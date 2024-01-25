
import React, { useRef } from 'react';
import { 
    Animated,
    BackHandler,
    Image,
    SafeAreaView, 
    ScrollView, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View, 
} from 'react-native';
import { useTheme, useFocusEffect } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import { COLORSI, FONTSI, IMAGES, SIZESI } from '../constants/theme';


const DATA = [
    {
        title : 'Let’s get started',
        desc : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ',
    },
    {
        title : 'Let’s get started',
        desc : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ',
    },
    {
        title : 'Let’s get started',
        desc : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ',
    },
]

const Onboarding = (props) =>{
    const {colors} = useTheme();
    useFocusEffect(
        React.useCallback(() => {
          const onBackPress = () => {
            BackHandler.exitApp();
            return true;
          };
     
          BackHandler.addEventListener(
            'hardwareBackPress',
            onBackPress
          );
     
          return () => {
            BackHandler.removeEventListener(
              'hardwareBackPress',
              onBackPress
            );
          };
        }, []),
    );

    const scrollValue = useRef(new Animated.Value(0)).current;

    return (
    <>
      <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
        <ScrollView contentContainerStyle={{flexGrow:1}}>
            
                <View style={{
                    flex:1,
                    alignItems:'center',
                    justifyContent:'center',
                    height:SIZESI.height / 2.2,
                }}>
                    <Image
                        style={{
                            width:280,
                            height:280,
                            resizeMode:'contain',
                        }}
                        source={require('../assets/imagesI/onboarding.png')}
                    />
                    <Image 
                        style={{
                            position:'absolute',
                            bottom:0,
                            width:'100%',
                            resizeMode:'stretch',
                            height:65,
                            //tintColor:colors.backgroundColor,
                        }}
                        source={require('../assets/imagesI/loginShape.png')}
                    />
                </View>
                <View style={{backgroundColor:'#332A5E',flex:1}}>
                    <View style={{flex:1}}>
                        <ScrollView
                            horizontal
                            pagingEnabled
                            decelerationRate="fast"
                            scrollEventThrottle={16}
                            showsHorizontalScrollIndicator={false}
                            onScroll={Animated.event(
                                [{ nativeEvent: { contentOffset: { x: scrollValue } } }],
                                { useNativeDriver: false },
                                )}>
                            {DATA.map((data,index) => (
                                
                                <View style={[styles.slideItem]} key={index}>
                                    <Text style={[FONTSI.h2,{textAlign:'center',color:COLORSI.white}]}>{data.title}</Text>
                                    <Text style={[FONTSI.font,{textAlign:'center',color:COLORSI.white,opacity:.7}]}>{data.desc}</Text>
                                </View>
                            
                            ))}
                        </ScrollView>
                        <View style={styles.indicatorConatiner} pointerEvents="none">
                            {DATA.map((x, i) => (
                                <Indicator i={i} key={i} scrollValue={scrollValue} />
                                ))}
                        </View>

                    </View>
                    <View style={GlobalStyleSheet.container}>
                        <View style={{paddingBottom:15}}>
                            <CustomButton
                                title="CREATE ACCOUNT"
                                onPress={()=> props.navigation.navigate('CreateAccount')}
                            />
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={()=> props.navigation.navigate('SignIn')}
                                style={{
                                    backgroundColor:'rgba(255,255,255,.2)',
                                    borderRadius:SIZESI.radius,
                                    height:50,
                                    alignItems:'center',
                                    justifyContent:'center',
                                }}
                            >
                                <Text style={{...FONTSI.fontLg,color:COLORSI.white}}>SIGN IN</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{alignItems:'center',padding:12}}>
                            <Text style={[FONTSI.font,{color:'rgba(255,255,255,.7)'}]}>Forgot your account?</Text>
                        </View>
                    </View>
                </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};


function Indicator({ i, scrollValue }) {
    const translateX = scrollValue.interpolate({
        inputRange: [-SIZESI.width + i  * SIZESI.width, i * SIZESI.width, SIZESI.width + i * SIZESI.width],
        outputRange: [-20, 0, 20],
    });
    return (
        <View style={styles.indicator}>
            <Animated.View
                style={[styles.activeIndicator, { transform: [{ translateX }] }]}
            />
        </View>
    );
}


const styles = StyleSheet.create({

    slideItem: {
        width: SIZESI.width,
        alignItems:'center',
        padding:25,
        paddingBottom:40,
        paddingTop:15,
    },
    indicatorConatiner: {
        alignSelf: 'center',
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
    },
    indicator: {
        height: 10,
        width: 10,
        // borderWidth:1,
        // borderColor:'transparent',
        borderRadius: 5,
        backgroundColor:'rgba(255,255,255,.2)',
        marginHorizontal: 4,
        overflow: 'hidden',
    },
    activeIndicator: {
        height: '100%',
        width: '100%',
        backgroundColor: COLORSI.primary,
        borderRadius: 10,

    },
  
})


export default Onboarding;
