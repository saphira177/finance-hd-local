import Vuex from 'vuex';
import { noop } from 'lodash';
import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import GroupList from '@/components/GroupList.vue';

jest.mock('@/utils/decorators', () => ({
  displayMoney: jest.fn(arg => `${arg}currency`),
}));

const localVue = createLocalVue();
localVue.use(Vuex);

describe('GroupList component', () => {
  let wrapper: Wrapper<GroupList>;
  let store;
  let getters: any;

  beforeEach(() => {
    getters = {
      allGroups: () => [],
      group: () => noop,
    };
    store = new Vuex.Store({ getters });
    wrapper = shallowMount(GroupList, { localVue, store });
  });

  it('should render with default value', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('should render all items', () => {
    getters = {
      ...getters,
      allGroups: () => [
        { _id: 'group1', name: 'Group 1', available: 1000 },
        { _id: 'group2', name: 'Group 2', available: 2000 },
      ],
    };
    store = new Vuex.Store({ getters });
    wrapper = shallowMount(GroupList, { localVue, store });
    const tiles = wrapper.findAll('v-list-tile-stub.group_item');
    expect(tiles).toHaveLength(2);
    expect(tiles.at(0).find('v-list-tile-title-stub').text()).toEqual('Group 1');
    expect(tiles.at(0).find('v-list-tile-action-text-stub').text()).toEqual('1000currency');
    expect(tiles.at(1).find('v-list-tile-title-stub').text()).toEqual('Group 2');
    expect(tiles.at(1).find('v-list-tile-action-text-stub').text()).toEqual('2000currency');
    const sheet = wrapper.find('v-bottom-sheet-stub');
    const actionMenu = sheet.findAll('v-list-tile-stub');
    expect(actionMenu).toHaveLength(3);
    expect(actionMenu.at(0).find('v-list-tile-title-stub').text()).toEqual('Show details');
    expect(actionMenu.at(1).find('v-list-tile-title-stub').text()).toEqual('Edit');
    expect(actionMenu.at(2).find('v-list-tile-title-stub').text()).toEqual('Delete');
  });
});
