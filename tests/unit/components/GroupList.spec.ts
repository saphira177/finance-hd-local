import { shallowMount, Wrapper } from '@vue/test-utils';
import GroupList from '@/components/GroupList.vue';

jest.mock('@/utils/decorators', () => ({
  displayMoney: jest.fn(arg => `${arg}currency`),
}));

describe('GroupList component', () => {
  let wrapper: Wrapper<GroupList>;

  beforeEach(() => {
    wrapper = shallowMount(GroupList);
  });

  it('should render with default value', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('should render all items', () => {
    wrapper.setProps({
      items: [
        { _id: 'group1', name: 'Group 1', available: 1000 },
        { _id: 'group2', name: 'Group 2', available: 2000 },
      ],
    });
    const tiles = wrapper.findAll('v-list-tile-stub');
    expect(tiles).toHaveLength(2);
    expect(tiles.at(0).attributes('to')).toEqual('/groups/group1');
    expect(tiles.at(0).find('v-list-tile-title-stub').text()).toEqual('Group 1');
    expect(tiles.at(0).find('v-list-tile-action-text-stub').text()).toEqual('1000currency');
    expect(tiles.at(1).attributes('to')).toEqual('/groups/group2');
    expect(tiles.at(1).find('v-list-tile-title-stub').text()).toEqual('Group 2');
    expect(tiles.at(1).find('v-list-tile-action-text-stub').text()).toEqual('2000currency');
  });
});
