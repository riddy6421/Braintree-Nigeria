package matimatiks.matimatiks;

import android.annotation.TargetApi;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.Window;
import android.view.WindowManager;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import com.google.firebase.auth.FirebaseAuth;

/**
 * Created by ridwan on 9/17/2016.
 */
public class Exam_category extends AppCompatActivity{
    private TextView text1,text2;
    private Button waec_jamb, jr_waec, c_e;
    private ImageButton sign_out;
    private FirebaseAuth firebaseAuth;
    private String name;
    private Animation fade_in, bounce;
    private Intent intent;
    public Boolean out = false;
    /*private MediaPlayer mp;
    private SurfaceView mSurfaceView;*/

    /**
     * @param savedInstanceState
     */
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_category);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Window window = getWindow();
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(getResources().getColor(R.color.company_color));
        }

        /*mp = new MediaPlayer();
        mSurfaceView = (SurfaceView) findViewById(R.id.surface);
        mSurfaceView.getHolder().addCallback((SurfaceHolder.Callback) this);*/
        fade_in = AnimationUtils.loadAnimation(getApplicationContext(),R.anim.fade_in);
        bounce = AnimationUtils.loadAnimation(getApplicationContext(),R.anim.bounce);

        firebaseAuth = FirebaseAuth.getInstance();

        text1 = (TextView) findViewById(R.id.cat_1);
        text2 = (TextView) findViewById(R.id.cat_2);

        String s = ("Hi, ");
        String w = ("Welcome!");
        String w1 = ("Welcome back!");

        String j = "";

            j = getName();

        String f;
        f = s.concat(j);
        text1.setText(f);
        text1.startAnimation(fade_in);

        if(isFirstInstall())
            text2.setText(w);

        else
            text2.setText(w1);

        text2.startAnimation(bounce);

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                Intent intent = new Intent(Exam_category.this, Exam_mode.class);
                intent.putExtra("SEL", 0);
                intent.putExtra("EXAM", "WAEC/jamb");
                startActivity(intent);

            }
        },4000);


        //View this later

        /*waec_jamb = (Button) findViewById(R.id.cat_butt1);
        jr_waec = (Button) findViewById(R.id.cat_butt2);
        c_e = (Button) findViewById(R.id.cat_butt3);*/
        //sign_out = (ImageButton) findViewById(R.id.out_button);


       /* waec_jamb.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(Exam_category.this, Exam_mode.class);
                intent.putExtra("SEL", 0);
                intent.putExtra("EXAM", "WAEC/jamb");
                startActivity(intent);

            }
        });

        jr_waec.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent = new Intent(Exam_category.this, Exam_mode.class);
                intent.putExtra("SEL", 1);
                intent.putExtra("EXAM", "Jr.WAEC");
                startActivity(intent);

            }
        });

        c_e.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent = new Intent(Exam_category.this, Exam_mode.class);
                intent.putExtra("SEL", 2);
                intent.putExtra("EXAM", "Common Entrance");
                startActivity(intent);
            }
        });*/

       /* sign_out.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                out = true;
                Intent intent = new Intent(Exam_category.this, Logout.class);
                startActivity(intent);
                Intent i = new Intent(Exam_category.this, Splashscreen.class);
                i.putExtra("OUT", out);
            }
        });*/

    }

   /* @Override
    protected void onResume() {
        super.onResume();
        mp = new MediaPlayer();
        mSurfaceView = (SurfaceView) findViewById(R.id.surface);
        mSurfaceView.getHolder().addCallback((SurfaceHolder.Callback) this);
    }*/

   /* @Override
    public void surfaceCreated(SurfaceHolder holder) {


        Uri video = Uri.parse("android.resource://" + getPackageName() + "/"
                + R.raw.slideshow);

        try {
            mp.setDataSource(getApplicationContext(),video);
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            mp.prepare();
        } catch (IOException e) {
            e.printStackTrace();
        }

        //Start video
        mp.setDisplay(holder);
        mp.setLooping(true);
        mp.start();
    }

    @Override
    public void surfaceChanged(SurfaceHolder holder, int format, int width, int height) {

    }

    @Override
    public void surfaceDestroyed(SurfaceHolder holder) {

    }*/

    /**
     *
     */
    @Override
    public void onBackPressed() {
        Intent intent = new Intent(Intent.ACTION_MAIN);
        intent.addCategory(Intent.CATEGORY_HOME);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(intent);
    }

    /**
     * gets name of current user
     *
     * @return name: name of the user signed in
     */
    public String getName() {

        if (firebaseAuth.getCurrentUser() != null) {

            String fullname = firebaseAuth.getCurrentUser().getDisplayName();
            if(firebaseAuth.getCurrentUser().isAnonymous()) {
                //firebaseAuth.getCurrentUser().delete();
                System.out.println("PROBLEM HERE 2");
            }
            if (fullname != null) {
                String Name[] = fullname.split(" ");
                name = Name[0];
            }
        } else {

            Toast.makeText(getApplicationContext(), "User session null", Toast.LENGTH_LONG).show();
        }

        return name;
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    public boolean isFirstInstall() {

        final String PREFS_NAME = "MyPrefsFile";
        final String PREF_VERSION_CODE_KEY = "version_code";
        final int DOESNT_EXIST = -1;

        int currentVersionCode = 0;
        try {
            currentVersionCode = getPackageManager().getPackageInfo(getPackageName(), 0).versionCode;
        } catch (android.content.pm.PackageManager.NameNotFoundException e) {
            // handle exception
            e.printStackTrace();
        }

        // Get saved version code
        SharedPreferences prefs = getSharedPreferences(PREFS_NAME, MODE_PRIVATE);
        int savedVersionCode = prefs.getInt(PREF_VERSION_CODE_KEY, DOESNT_EXIST);

        boolean firstInstall = savedVersionCode == DOESNT_EXIST || currentVersionCode > savedVersionCode;

        // Update the shared preferences with the current version code
        prefs.edit().putInt(PREF_VERSION_CODE_KEY, currentVersionCode).apply();

        return firstInstall;

    }

}

