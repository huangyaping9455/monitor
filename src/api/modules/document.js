import {
  $axios,
  awaitWrap
} from '../api';
import qs from 'qs';
export default {
  getTree(params) {
    return $axios.get('/blade-doc/doc/SafetyProductionFile/tree', {
      params: params
    });
  },
  addSubtemplateDir(id, fileName) {
    return $axios.post('/blade-doc/doc/SafetyProductionFile/addDir', {
      params: {
        id: id,
        fileName: fileName
      }
    });
  },
  remove(id) {
    return $axios.post('/blade-doc/doc/SafetyProductionFile/del', {
      params: id
    });
  },
  uploadDocByImg(data) {
    return $axios.post('/blade-doc/doc/SafetyProductionFile/addImages', {
      data
    });
  },
  download(id) {
    return $axios.get('/blade-doc/doc/SafetyProductionFile/downloadFile', {
      params: id
    });
  },
  imgPreview(params) {
    params = qs.stringify(params)
    return $axios.post('/blade-doc/doc/SafetyProductionFile/imgPreview', params);
  },
  moveFile(originId, targetId) {
    return $axios.get('/blade-doc/doc/SafetyProductionFile/swapFileSort', {
      params: {
        originId,
        targetId
      }
    });
  },
  modifyFileNumber(id, documentNumber) {
    return $axios.get('/blade-doc/doc/SafetyProductionFile/updateDocumentNumber', {
      params: {
        id,
        documentNumber
      }
    });
  },
  directoryTree(deptId, parentId) {
    return $axios.get('/blade-doc/doc/SafetyProductionFile/boxTree', {
      params: {
        deptId,
        parentId
      }
    });
  },
  awaitWrap
};