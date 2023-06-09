/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form, Input, InputNumber, Row } from 'antd';
import { useDispatch } from 'react-redux';
import Frame from '../Frame';

import styles from './ServerConnectFrame.module.scss';
import {
  connectToDatabase as connectToDatabaseApi,
  changeGraph,
} from '../../../features/database/DatabaseSlice';
import { addAlert } from '../../../features/alert/AlertSlice';
import { addFrame, trimFrame } from '../../../features/frame/FrameSlice';
import {
  /* getMetaChartData, */ getMetaData,
} from '../../../features/database/MetadataSlice';

import axios from 'axios';

const FormInitialValue = {
  database: '',
  graph: '',
  host: '',
  password: '',
  port: null,
  user: '',
};

const ServerConnectFrame = ({ refKey, isPinned, reqString, currentGraph }) => {
  const connectToDatabase = async (data) => {
    const formData = {
      graph_init: true,
      ssl: 'disable',
      version: 11,
    };

    const updatedData = { ...data, ...formData };
    try {
      const response = await fetch('http://localhost:8080/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Response:', data);
      } else {
        console.log('Request failed with status:', response.status);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <Frame reqString={reqString} isPinned={isPinned} refKey={refKey}>
      <Row>
        <Col span={6}>
          <h3>Connect to Database</h3>
          <p>Database access might require an authenticated connection.</p>
        </Col>
        <Col span={18}>
          <div className={styles.FrameWrapper}>
            <Form
              initialValues={FormInitialValue}
              layout="vertical"
              onFinish={connectToDatabase}
            >
              <Form.Item
                name="host"
                label="Connect URL"
                rules={[{ required: true }]}
              >
                <Input placeholder="192.168.0.1" />
              </Form.Item>
              <Form.Item
                name="port"
                label="Connect Port"
                rules={[{ required: true }]}
              >
                <InputNumber placeholder="5432" className={styles.FullWidth} />
              </Form.Item>
              <Form.Item
                name="database"
                label="Database Name"
                rules={[{ required: true }]}
              >
                <Input placeholder="postgres" />
              </Form.Item>
              <Form.Item
                name="user"
                label="User Name"
                rules={[{ required: true }]}
              >
                <Input placeholder="postgres" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true }]}
              >
                <Input.Password placeholder="postgres" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Connect
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </Frame>
  );
};

ServerConnectFrame.propTypes = {
  refKey: PropTypes.string.isRequired,
  isPinned: PropTypes.bool.isRequired,
  reqString: PropTypes.string.isRequired,
  currentGraph: PropTypes.string.isRequired,
};

export default ServerConnectFrame;