import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Kakaologins from '@react-native-seoul/kakao-login';
import RNKakaoLink from 'react-native-kakao-links';

const App = () => {
  const [txt, settxt] = useState('hello');
  const _login = () => {
    console.log('log in');
    Kakaologins.login().then((res) => {
      console.log(res.accessToken);
      settxt(res.accessToken);
    });
  };
  const _share = async () => {
    console.log('share');
    try {
      const options = {
        objectType: 'location', //required
        content: {
          title: 'location', //required
          link: {
            iosExecutionParams: 'id=0',
          }, //required
          imageURL: 'https://i.stack.imgur.com/lQQjg.png', //required
        }, //required
        address: '인천 광역시 부평구 일신동 12-24',
        addressTitle: 'My house',
        buttons: [
          {
            title: '앱으로 이동', //required
            link: {
              iosExecutionParams: 'id=0',
            },
          },
        ],
      };
      const mes = await RNKakaoLink.link(options);
      console.log(mes);
    } catch (e) {
      console.warn(e);
    }
  };
  return (
    <View style={styles.container}>
      <Text>{txt}</Text>
      {/* <View style={styles.main}> */}
      <TouchableOpacity style={{borderWidth: 1, margin: 10}} onPress={_login}>
        <Text style={styles.txt}>log in</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{borderWidth: 1, margin: 10}} onPress={_share}>
        <Text style={styles.txt}>share</Text>
      </TouchableOpacity>
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  txt: {
    fontSize: 30,
  },
});

export default App;
