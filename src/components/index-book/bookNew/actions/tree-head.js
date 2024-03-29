import tree from '../tree';
export default {
  name: 'tree-head',
  mixins: [tree],
  props: {
    deep: {
      defalut: Number
    },
    order: [Number, String],
    active: {
      type: Object
    },
    data: {
      type: Object
    },
    expandAll: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    spaceStyle() {
      return {
        'text-indent': this.deep * 20 + 'px'
      };
    },

    isFolder() {
      return this.data.type == '文件夹';
    },

    isLoading() {
      return this.data._loading;
    }
  },
  created() {
    this.initAttr();
    // 根据地址参数自动展开第一级
    if (this.data.id == this.$route.query[1]) {
      this.data.id = this.$route.query[1];
      this.headClick();
    }
    if (this.data.id == this.$route.query[2]) {
      if (this.active.id !== this.data.id) {
        this.data.id = this.$route.query[2];
        this.headClick();
      }
    }
    if (this.data.id == this.$route.query[3]) {
      this.data.id = this.$route.query[3];
      this.headClick();
    }
  },
  methods: {
    initAttr() {
      if (this.data._loading === undefined) {
        this.$set(this.data, '_loading', false);
      }
      if (this.data.type == '文件夹') {
        if (this.data._unfold === undefined) {
          this.$set(this.data, '_unfold', this.expandAll);
        }
        if (this.data._load === undefined) {
          this.$set(
            this.data,
            '_load',
            this.children.length > 0
          );
        }
      }
    },

    headClick() {
      let item = this.data;
      if (this.isFolder && !item._load) {
        this.$parent.$emit('loadNode', item);
      }
      this.unfold(item);
    },

    contextmenu(event) {
      if (event.button == 2) {
        this.$parent.$emit('contextmenu', {
          event,
          data: this.data
        });
        this.$emit('parentNodes', {
          nodes: [],
          deep: this.deep
        });
        event.preventDefault();
      }
    }
  }
};