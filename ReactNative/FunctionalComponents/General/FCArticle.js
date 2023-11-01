import React from 'react'
import { View, Image, ScrollView } from 'react-native';
import { Text, Icon } from 'react-native-elements'
import styleSheet from '../../Pages/PageStyle';
import FCHeader from '../General/FCHeader';
import { useNavigation } from '@react-navigation/native';

export default function FCArticle(props) {
    const navigation = useNavigation();

    return (
        <View style={styleSheet.container}>
            <View>
                <FCHeader />
                <Icon
                    onPress={
                        () => {
                            navigation.goBack()
                        }
                    }
                    reverse
                    name='chevron-back-outline'
                    type='ionicon'
                    color='#691A1A'
                />
            </View>
            <ScrollView>
                <Text h2 style={styleSheet.h4Text}> {props.route.params.header}</Text>
                <Image
                    source={{ uri: props.route.params.pictures[0].picture }}
                    style={[styleSheet.event, { alignSelf: 'center' }]} />
                <Text style={styleSheet.h4Text}> {props.route.params.article}</Text>
            </ScrollView>

        </View>
    )
}
