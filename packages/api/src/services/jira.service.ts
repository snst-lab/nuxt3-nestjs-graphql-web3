import { Injectable } from '@nestjs/common';
import axios from 'axios';
import type {
  FetchBoadsResponse,
  FetchIssuesResponse,
  FetchSprintsResponse,
} from '@/models';
import { constants } from '@constants';

// id, token は自分のJiraアカウントのものを.envに記載してください
const id = constants.vendor.jira.auth_id;
const token = constants.vendor.jira.auth_token;

// ヘッダー情報は共通部分を定義（追加がある場合は個別に追記）
const auth = { username: id, password: token };
const headers = {
  Accept: 'application/json',
  'Accept-Encoding': '*',
};

const rootUrl = 'https://tanusuke.atlassian.net//rest/agile/1.0';

const createUrl = (path: string): string => `${rootUrl}${path}`;

@Injectable()
export class JiraService {
  async fetchBoads(): Promise<FetchBoadsResponse> {
    try {
      const { data } = await axios.get(createUrl('/board'), {
        auth,
        headers,
      });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async fetchSprints(boadId: number): Promise<FetchSprintsResponse> {
    try {
      const { data } = await axios.get(createUrl(`/board/${boadId}/sprint`), {
        auth,
        headers,
      });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async fetchIssues(
    boadId: number,
    sprintId: number,
  ): Promise<FetchIssuesResponse> {
    try {
      const { data } = await axios.get(
        createUrl(`/board/${boadId}/sprint/${sprintId}/issue`),
        {
          auth,
          headers,
        },
      );
      return data;
    } catch (error) {
      if (error.response?.status === 404) {
        return null;
      }
      console.log(error);
      throw error;
    }
  }
}
