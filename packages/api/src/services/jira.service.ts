import { Injectable } from '@nestjs/common';
import { Args, ArgsType, Field } from '@nestjs/graphql';
import { GoogleAuthArgs } from '@/models';
import axios from 'axios';
import type { FetchBoadsResponse } from '@/models';
import { constants } from '@constants';

// HACK ここを後で何とかしないと
const id = constants.vendor.jira.auth_id;
const token = constants.vendor.jira.auth_token;

const auth = { username: id, password: token };

const url = 'https://tanusuke.atlassian.net//rest/agile/1.0';

const createUrl = (path: string): string => `${url}${path}`;

@Injectable()
export class JiraService {
  async fetchBoads(): Promise<FetchBoadsResponse> {
    try {
      const { data } = await axios.get(createUrl('/board'), {
        auth,
        headers: {
          Accept: 'application/json',
          'Accept-Encoding': '*',
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
