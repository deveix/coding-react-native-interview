import React, {useState, useEffect, useCallback} from 'react';
import {TextInput, View, TouchableOpacity} from 'react-native';
import {SearchIcon, XCircleIcon} from 'lucide-react-native';
import tw from '@lib/tailwind';

interface SearchInputProps {
  placeholder?: string;
  onSearch: (text: string) => void;
  debounceDelay?: number;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search...',
  onSearch,
  debounceDelay = 200,
}) => {
  const [searchText, setSearchText] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  const handleTextChange = useCallback(
    (text: string) => {
      setSearchText(text);

      if (timer) {
        clearTimeout(timer);
      }

      const newTimer = setTimeout(() => {
        onSearch(text);
      }, debounceDelay);

      setTimer(newTimer);
    },
    [debounceDelay, onSearch, timer],
  );

  const handleClear = () => {
    setSearchText('');
    onSearch('');
  };

  return (
    <View className="relative flex-row items-center h-12 bg-white border border-gray-300 rounded-lg overflow-hidden">
      <View className="pl-4 pr-2">
        <SearchIcon size={20} color={tw.color('gray-500')} />
      </View>
      <TextInput
        className="flex-1 text-[15px] text-gray-900 pr-4"
        placeholder={placeholder}
        placeholderTextColor={tw.color('gray-500')}
        value={searchText}
        onChangeText={handleTextChange}
        autoCorrect={false}
        autoCapitalize="none"
      />
      {searchText.length > 0 && (
        <TouchableOpacity onPress={handleClear} className="pr-4">
          <XCircleIcon size={20} color={tw.color('gray-400')} />
        </TouchableOpacity>
      )}
    </View>
  );
};
