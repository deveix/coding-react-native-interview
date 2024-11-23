import React, {useCallback} from 'react';
import {View, FlatList} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import tw from '@lib/tailwind';
import {useMovies} from '@features/movie/hooks';
import {useSearchParams} from '../../context/SearchParamsContext';
import {LayoutWrapper, MovieItem, SearchInput} from '@components';
import {RootStackParamList} from '@/types/navigation';
import {Movie} from '@/types/movie';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {SCREENS} from '@constants';
import {MoviesLoading} from '@features/movie/components';

interface MoviesListScreenProps extends StackScreenProps<RootStackParamList> {}

export const MoviesListScreen: React.FC<MoviesListScreenProps> = ({}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {setSearchParams} = useSearchParams();
  const {movies, isLoading} = useMovies();

  const handleMoviePress = useCallback(
    (movie: Movie) => {
      navigation.navigate(SCREENS.MOVIE.DETAIL, {
        movie,
      });
    },
    [navigation],
  );

  return (
    <LayoutWrapper title="Movies List" className="gap-y-4">
      <SearchInput
        placeholder="Search movies..."
        onSearch={text => setSearchParams({query: text})}
      />
      <View className="flex-1">
        {isLoading ? (
          <MoviesLoading />
        ) : (
          <FlatList
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            data={movies}
            contentContainerStyle={tw`gap-y-4 pb-10`}
            renderItem={({item: movie}) => (
              <MovieItem
                key={movie.id.toString()}
                movie={movie}
                onPress={() => handleMoviePress(movie)}
              />
            )}
          />
        )}
      </View>
    </LayoutWrapper>
  );
};
