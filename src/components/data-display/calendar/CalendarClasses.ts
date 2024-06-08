import { attachPrefixClasses } from '@modules/utils';

const classes = {
  wrap: 'wrap',
  header: {
    wrap: '',
    title: 'title',
    buttonWrap: 'button-wrap',
  },
  weeknames: {
    wrap: 'wrap',
    item: 'item',
  },
  week: {
    root: '',
    dayEx: {
      wrap: 'wrap',
      expandWrap: 'expand-wrap',
      ranged: {
        base: '',
        start: 'start',
        end: 'end',
      },
      item: {
        base: '',
        today: 'today',
        outOfMonth: 'outofmonth',
      },
      hasitem: {
        root: '',
        selected: 'selected',
      },
    },
  },
  quick: {
    wrap: 'wrap',
    item: 'item',
  },
};

export const calendarExClasses = attachPrefixClasses(classes, 'calendar', true);
