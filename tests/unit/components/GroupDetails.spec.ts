import { shallowMount, Wrapper } from '@vue/test-utils';
import GroupDetails from '@/components/GroupDetails.vue';

jest.mock('@/utils/decorators', () => ({
  displayMoney: jest.fn(arg => `${arg}currency`),
}));

describe('GroupDetails component', () => {
  let wrapper: Wrapper<GroupDetails>;

  beforeEach(() => {
    wrapper = shallowMount(GroupDetails);
  });

  it('should render with default value', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('should render all outcomes', () => {
    wrapper.setProps({
      outcomes: {
        category1: 1000,
        category2: 2000,
      },
    });
    const tiles = wrapper.findAll('v-list-tile-stub');
    expect(tiles).toHaveLength(2);
    expect(tiles.at(0).find('v-list-tile-title-stub').text()).toEqual('category1');
    expect(tiles.at(0).find('v-list-tile-action-text-stub').text()).toEqual('1000currency');
    expect(tiles.at(1).find('v-list-tile-title-stub').text()).toEqual('category2');
    expect(tiles.at(1).find('v-list-tile-action-text-stub').text()).toEqual('2000currency');
  });
});
