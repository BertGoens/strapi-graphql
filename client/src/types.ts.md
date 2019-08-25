```typescript
// When we send a post request to /upload it return an array of MediaPost
export interface MediaPost {
  created_at: string;
  ext: string;
  hash: string;
  id: number;
  mime: string;
  name: string;
  provider: string;
  public_id: null;
  related: [any];
  sha256: string;
  size: string;
  updated_at: string;
  url: string;
}

// An example of 1 MediaPost object
/* 
  created_at: "2019-08-25T10:39:57.177Z"
  ext: ".png"
  hash: "b53db0cffdd84cff9526aa1d4016b13f"
  id: 56
  mime: "image/png"
  name: "red.png"
  provider: "local"
  public_id: null
  related: Array [ {…} ]
  sha256: "rTl7KUdpKCx5vgPmErlBi7GtYUzl7QTAwH5p7R-zd98"
  size: "0.21"
  updated_at: "2019-08-25T10:39:57.185Z"
  url: "/uploads/b53db0cffdd84cff9526aa1d4016b13f.png"
*/
```
