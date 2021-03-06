import classUtil from './classUtil';

class ThemeSwitch {
  constructor(config) {
    this.storage = config.storage || window.localStorage;
    this.classUtil = config.classUtil || classUtil;
    this.page = config.pageElement;
    this.switch = config.switchElement;
    this.themeClasses = config.themeClasses;
    this.themeType = config.themeType;
  }

  setup() {
    this.theme = this.getTheme();
    this.setTheme(this.theme);
    this.switch.addEventListener('click', this.handleSwitch.bind(this));
  }

  handleSwitch() {
    this.toggleTheme();
    this.setTheme(this.theme);
  }

  getTheme() {
    return this.storage.getItem(this.themeType) || this.themeClasses[0];
  }

  toggleTheme() {
    if (this.theme === this.themeClasses[0]) {
      return (this.theme = this.themeClasses[1]);
    }
    this.theme = this.themeClasses[0];
  }

  setTheme(theme) {
    this.classUtil.removeClasses(this.page, this.themeClasses);
    this.classUtil.setClass(this.page, theme);
    this.theme = theme;
    this.saveTheme(theme);
  }

  saveTheme(theme) {
    this.storage.setItem(this.themeType, theme);
  }
}

export default ThemeSwitch;
